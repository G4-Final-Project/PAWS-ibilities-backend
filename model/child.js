'use strict';

const mongoose = require('mongoose');
const Pet = require('./pet');

const childSchema = mongoose.Schema({
  name: {type: String, required: true},
  phone: {type: Number, required: true},
  created: {type: Date, default: Date.now},
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
  pet: {type: mongoose.Schema.Types.ObjectId, ref: 'pet'},
});

const Child = module.exports = mongoose.model('child', childSchema);

Child.findByIdAndAddPet = function(child, pet) {
  let tempPet;
  Pet.findById(pet._id)
    .then(pet => {
      tempPet = pet;
    })
    .catch(err => Promise.reject(err));

  return Child.findById(child)
    .then(child => {
      console.log(child);
      tempPet.childId = child.id;
      this.tempChild = child;
      return new Pet(tempPet).save();
    })
    .then(pet => {
      this.tempChild.pet = pet._id;
      this.tempPet = pet;
      this.tempChild.save();

      return this.tempPet.save();
    });
};
