'use strict';

const mongoose = require('mongoose');
const User = require('../model/user');

const childSchema = mongoose.Schema({
  name: {type: String, required: true},
  phone: {type: Number, required: true},
  created: {type: Date, default: Date.now},
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
  pet: {type: mongoose.Schema.Types.ObjectId, ref: 'pet'},
});

childSchema.pre('save', function(next){
  User.findById(this.userId)
  .then(user =>{
    user.children.push(this._id.toString());
    return user.save();
  })
  .then(()=> next())
  .catch(next);
});

module.exports = mongoose.model('child', childSchema);
