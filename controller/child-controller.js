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
  let chitlin = req.params.childId;
  User.findById(req.params.userId)
  .then(user => {
    console.log(user.children);
    console.log('chitlin:', chitlin);
    for(let i =0; i < user.children.length; i++) {
      console.log(user.children[i]);
      if(user.children[i].objectId === chitlin) {
        console.log('TRUE');
        user.children.slice(i, 1);
      }
    } // close loop
    return Child.findByIdAndRemove(req.params.childId);
  })
  .catch(err => Promise.reject(err.message));
};

exports.getChild = function(req) {
  return Child.findById(req.params.childId)
  .then(child => child)
  .catch(err => Promise.reject(err.message));
};
