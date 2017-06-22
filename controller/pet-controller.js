'use strict';

require('dotenv').config({path: `${__dirname}/../.env`});
const Pet = require('../model/pet');
const createError = require('http-errors');
const Child = require('../model/child');
const User = require('../model/user');

var accountSid = process.env.TWILIO_ACCOUNT_SID;
var authToken = process.env.TWILIO_AUTH_TOKEN;

const twilio = require('twilio')(accountSid, authToken);

function sendText(child) {
  twilio.messages.create({
    to: `+${child.phone}`,
    from: +'13603299086',
    body: `"BARK BARK!" Your pet needs food. https://paw-sibilities-front.herokuapp.com/api/child/${child._id}/pet`,
  }, function() {
    console.log('message.sent');
  });
}

module.exports = exports = {};

exports.postPet = function(req) {
  let owner;
  Child.findById(req.params.childId)
    .then(child => {
      sendText(child);
      owner = child._id;
    });

  return new Pet(req.body).save()
    .then(pet => {
      return Child.findByIdAndAddPet(owner, pet)
        .then(pet => pet)
        .catch(err => Promise.reject(createError(400), err.message));
    })
    .then(pet => pet)
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
  let user;
  let pets = [];
  let kids = [];
  return User.findById(req.user._id)
    .then(found => {
      user = found;
      // console.log('found:',found);
      for(let i = 0; i < user.children.length; i ++){
        kids.push(user.children[i]);
      }
      return kids;
    })
    .then(kids => {
      for(let i = 0; i < kids.length; i++){
        return Child.findById(kids[i])
          .then(kiddo => {
            return Pet.findById(kiddo.pet[0])
              .then(pet => {
                pets.push(pet);
                return pets;
              });
          });
      } // CLOSE LOOP
    })
    .then(pets => {
      return pets;
    })
    .catch(err => Promise.reject(err.message));
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
