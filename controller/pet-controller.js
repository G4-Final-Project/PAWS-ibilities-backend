'use strict';

const Pet = require('../model/pet');
const createError = require('http-errors');
const Child = require('../model/child');

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
  return Pet.findById(req.params.petId)
  .then(pet => pet)
  .catch(err => Promise.reject(createError(400), err.message));
};

exports.putPet = function(req) {
  return Pet.findByIdAndUpdate(req.params.petId, req.body, {new: true})
    .then(pet => pet)
    .catch(err => Promise.reject(createError(400), err.message));
};

exports.deletePet = function(req) {
  Child.findById(req.params.id)
  .then(child => {
    delete child.pet;
    return child;
  })
  .then(child => child.save())
  .catch(err => Promise.reject(err.message));

  return Pet.findByIdAndRemove(req.params.petId)
  .catch(err => Promise.reject(err.message));
};
