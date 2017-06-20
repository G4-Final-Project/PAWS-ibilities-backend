'use strict';

const Promise = require('bluebird');
const User = require('../model/user');
const createError = require('http-errors');

module.exports = exports = {};

exports.createUser = function(req) {

  if(!req.body.email) return Promise.reject(createError(400, 'Email Address Required'));
  if(!req.body.password) return Promise.reject(createError(400, 'Password Required'));
  if(!req.body.username) return Promise.reject(createError(400, 'username Required'));
  if(!req.body.phone) return Promise.reject(createError(400, 'phone Required'));


  let tempPassword = req.body.password;
  req.body.password = null;
  delete req.body.password;

  let newUser = new User(req.body);

  return newUser.generatePasswordHash(tempPassword)
    .then(user => user.save())
    .then(user => user.generateToken())
    .then(token =>  token)
    .catch(err => Promise.reject(createError(400, err.name)));
};

exports.fetchUser = function(req) {
  return User.findOne({ username: req.auth.username })
    .then(user => {
      if(!user) Promise.reject(createError(401, 'Unauthorized'));
      return user.comparePasswordHash(req.auth.password)
      .then(user => user.generateToken());
    })
    .catch(err => Promise.reject(createError(401, err.message)));
};

exports.updateUser = function(req) {
  if(!req.params.id) Promise.reject(createError(400, 'Id required'));
  return User.findByIdAndUpdate({ _id: req.params.id }, req.body, {new: true})
    .then(data =>  data)
    .catch(err => Promise.reject(createError(404, err.message)));
};

exports.deleteUser = function(req) {
  if(!req.params.id) return Promise.reject(createError(401, 'Unauthorized'));
  return User.findByIdAndRemove(req.params.id)
    .catch(err => Promise.reject(createError(400, err.message)));
};
