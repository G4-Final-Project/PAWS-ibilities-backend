'use strict';

// const debug = require('debug')('PAWS:child-route');

const Child = require('../model/child');
const User = require('../model/user');

module.exports = exports = {};

exports.postChild = function(req){
  let newChildData ={
    userId: req.user._id,
    name: req.body.name,
    phone: req.body.phone,
  };
  return new Child(newChildData).save()
    .then(child =>{
      return child;
    })
    .catch(err => Promise.reject(err.message));
};

exports.putChild = function(req) {
  return Child.findByIdAndUpdate(req.params.childId, req.body, {new: true})
  .then(child => child)
  .catch(err => Promise.reject(err.message));
};

exports.deleteChild = function(req) {
  User.findById(req.params.userId)
  .then(user => {
    for(let i = 0; i < user.children.length; i++) {
      console.log(user.children[i]);
      console.log(req.params.childId);
      if(user.children[i] == req.params.childId) {
        console.log('TRUE');
        user.children.splice(i, 1);
        console.log(user);
      }
    }
  })
  .catch(err => Promise.reject(err.message));

  return Child.findByIdAndRemove(req.params.childId)
  .then(() => {

  })
  .catch(err => Promise.reject(err.message));
};

exports.getChild = function(req) {
  return Child.findById(req.params.childId)
  .then(child => child)
  .catch(err => Promise.reject(err.message));
};
