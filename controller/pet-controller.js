'use strict';

const Pet = require('../model/pet');
const createError = require('http-errors');
// const Child = require('../model/child');

module.exports = exports = {};

exports.postPet = function(req) {
  let newPetData ={
    childId: req.params.childId,
    name: req.body.name,
  };
  return new Pet(newPetData).save()
    .then(pet =>{
      return pet;
    })
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

// exports.deletePet = function(req) {
//
// };
