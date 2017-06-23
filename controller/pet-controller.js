'use strict';

require('dotenv').config({path: `${__dirname}/../.env`});
const Pet = require('../model/pet');
const createError = require('http-errors');
const Child = require('../model/child');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const twilio = require('twilio')(accountSid, authToken);

function sendText(child) {
  twilio.messages.create({
    to: `+${child.phone}`,
    from: +'13603299086',
    body: `"BARK BARK!" Your pet needs food. https://paw-sibilities-front.herokuapp.com/pet/${child._id}`,
  });
}

module.exports = exports = {};

exports.postPet = function(req) {
  let owner;
  Child.findById(req.params.childId)
    .then(child => {
      owner = child._id;
      sendText(child);
    });

  return new Pet(req.body).save()
    .then(pet => {
      return Child.findByIdAndAddPet(owner, pet)
        .then(pet => {
          return pet;
        })
        .catch(err => Promise.reject(createError(400), err.message));
    })
    .then(pet => {
      return pet;
    })
    .catch(err => Promise.reject(createError(400), err.message));
};

exports.getPet = function(req) {
  let petId;
  return Child.findById(req.params.childId)
  .then(child => {
    petId = child.pet[0];
    return Pet.findById(petId)
      .then(pet => pet)
      .catch(err => Promise.reject(createError(400), err.message));
  })
  .then(pet => pet)
  .catch(err => Promise.reject(createError(400), err.message));
};



exports.getAllPets = function(req) {
  let result = [];
  let count = 0;


  function reducePets(pets) {
    return Child.findById(pets[count].childId)
      .then(child => {
        if(child.userId.toString() === req.user._id.toString()) {
          result.push(pets[count]);
        }
        if(count === (pets.length - 1)) {
          return result;
        }
        count += 1;
        return reducePets(pets);
      });
  }
  return Pet.find()
    .then(pets => {
      return reducePets(pets);
    })
  .then(result => {
    if(result) {
      return result;
    }
  })
  .catch(err => Promise.reject(createError(400), err.message));
};





exports.putPet = function(req) {
  let petId;
  return Child.findById(req.params.childId)
  .then(child => petId = child.pet[0])
  .then(() => {
    return Pet.findByIdAndUpdate(petId, req.body, {new: true})
    .then(pet => {
      return pet;
    });
  })
  .catch(err => Promise.reject(createError(400), err.message));

};

exports.deletePet = function(req) {
  let petId;
  return Child.findById(req.params.childId)
    .then(child => {
      petId = child.pet[0];
      child.pet = [];
      return child.save();
    })
    .then(() => {
      return Pet.findByIdAndRemove(petId);
    })
    .catch(err => Promise.reject(err.message));
};
