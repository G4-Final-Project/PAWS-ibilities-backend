'use strict';

const Pet = require('../model/pet');
const createError = require('http-errors');
const Child = require('../model/child');
const User = require('../model/user');

module.exports = exports = {};

exports.postPet = function(req) {
  let owner;
  Child.findById(req.params.childId)
    .then(child => {
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
  Child.findById(req.params.childId)
  .then(child => {
    petId = child.pet[0];
  });
  return Pet.findByIdAndUpdate(petId, req.body, {new: true})
    .then(pet => pet)
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
