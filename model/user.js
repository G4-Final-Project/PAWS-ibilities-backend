'use strict';

const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const createError = require('http-errors');
const Child = require('./child');

const Schema = mongoose.Schema;

const userSchema = Schema({
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  phone: {type: Number, required: true},
  findHash: {type: String, unique: true},
  children:[{type: Schema.Types.ObjectId, ref: 'child'}],
});

userSchema.methods.generatePasswordHash = function(password){
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return reject(err);
      this.password = hash;
      resolve(this);
    });
  });
};

userSchema.methods.comparePasswordHash = function(password){
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, (err, valid) => {
      if(err) return reject(createError(401, 'Password invalid'));
      if(!valid) return reject(createError(401, 'Wrong password'));
      resolve(this);
    });
  });
};

userSchema.methods.generateFindHash = function(){
  return new Promise((resolve, reject) => {
    let tries = 0;
    _generateFindHash.call(this);

    function _generateFindHash(){
      this.findHash = crypto.randomBytes(32).toString('hex');
      this.save()
        .then(() => resolve(this.findHash))
        .catch(err => {
          if (tries > 3) return reject(err);
          tries++;
          _generateFindHash.call(this);
        });
    }
  });
};

userSchema.methods.generateToken = function(){
  return new Promise((resolve, reject) => {
    this.generateFindHash()
      .then(findHash => resolve(jwt.sign({token: findHash}, process.env.APP_SECRET)))
      .catch(err => reject(err));
  });
};

const User = module.exports = mongoose.model('user', userSchema);

User.findByIdAndAddChild = function(user, child) {
  return User.findById(user)
    .then(user => {
      child.userId = user._id;
      this.tempUser = user;
      return new Child(child).save();
    })
    .then(child => {
      this.tempUser.children.push(child._id);
      this.tempChild = child;
      return this.tempUser.save();
    })
    .then(() => this.tempChild)
    .catch(err => Promise.reject(err));
};
