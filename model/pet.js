'use strict';

const mongoose = require('mongoose');
const Child = require('./child');

const petSchema = mongoose.Schema({
  name: {type: String, required: true},
  desc: {type: String},
  created: {type: Date, default: Date.now},
  walk: {type: Number, default: 0},
  hunger: {type: Number, default: 0},
  thirst: {type: Number, default: 0},
  grooming: {type: Number, default: 0},
  age: {type: Number, default: 0},
  childId: {type: mongoose.Schema.Types.ObjectId, ref: 'child'},
  // userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
  // objectKey: {type: String, required: true, unique: true},
});

petSchema.pre('save', function(next){
  console.log('this is this', this.childId);
  Child.findById(this.childId)
  .then(child => {
    console.log('this is child in pre', child);
    child.pet = this._id.toString();
    return child.save();
  })
  .then(()=> next())
  .catch(next);
});

module.exports = mongoose.model('pet', petSchema);
