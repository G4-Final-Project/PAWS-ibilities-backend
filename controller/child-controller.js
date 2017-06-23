'use strict';

// const debug = require('debug')('PAWS:child-route');

const Child = require('../model/child');
const User = require('../model/user');
const createError = require('http-errors');

module.exports = exports = {};

exports.postChild = function(req){
  return new Child(req.body).save()
    .then(child => {
      return User.findByIdAndAddChild(req.user._id, child)
      .then(child => child)
      .catch(err => Promise.reject(createError(400), err.message));
    })
    .then(child => child)
    .catch(err => Promise.reject(createError(400), err.message));
};

exports.putChild = function(req) {
  return Child.findByIdAndUpdate(req.params.childId, req.body, {new: true})
  .then(child => child)
  .catch(err => Promise.reject(err.message));
};

exports.deleteChild = function(req) {
  User.findById(req.user._id)
  .then(user => {
    for(let i = 0; i < user.children.length; i++) {
      if(user.children[i] == req.params.childId) {
        user.children.splice(i, 1);
        return user;
      }
    }
  })
  .then(user => user.save())
  .catch(err => Promise.reject(err.message));

  return Child.findByIdAndRemove(req.params.childId)
  .catch(err => Promise.reject(err.message));
};

exports.getChild = function(req) {
  return Child.findById(req.params.childId)
  .then(child => child)
  .catch(err => Promise.reject(err.message));
};
exports.getAllChildren = function(req) {
  return Child.find({userId: req.user._id})
  .then(children => {
    return children;
  })
  .catch(err => Promise.reject(err.message));
};
