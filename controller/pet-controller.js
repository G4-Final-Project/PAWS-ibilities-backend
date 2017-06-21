'use strict';

const Pet = require('../model/pet');
const createError = require('http-errors');
const Child = require('../model/child');

module.exports = exports = {};

exports.postPet = function(req) {
  let owner;
  Child.findById(req.params.childId)
    .then(child => {
      console.log(child);
      owner = child._id;
    });

  return new Pet(req.body).save()
    .then(pet => {
      console.log('HERE');
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
