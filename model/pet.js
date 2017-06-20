'use strict';

const mongoose = require('mongoose');

const petSchema = mongoose.Schema({
  name: {type: String, required: true},
  desc: {type: String},
  created: {type: Date, default: Date.now},
  totalWalks: {type: Number, default: 0},
  averageWalks: {type:Number, default: 0},
  currentHunger: {type: Number, default: 0},
  missedFeedings: {type: Number, default: 0},
  accidents: {type: Number, default: 0},
  thirst: {type: Number, default: 0},
  grooming: {type: Number, default: 0},
  age: {type: Number, default: 0},
  childId: {type: mongoose.Schema.Types.ObjectId, ref: 'child'},
});

module.exports = mongoose.model('pet', petSchema);
