'use strict';

const User = require('../model/user.js');

module.exports = function(done) {

  new User({
    username : 'test',
    email: 'testUser' + Math.floor(Math.random() * (100 -1)) +1 + '@gmail.com',
    phone: 5555555555,
  }).generatePasswordHash('123')
  .then(user => user.save())
  .then(user => {
    this.tempUser = user;
    return user.generateToken();
  })
  .then(token => {
    this.tempToken = token;
    done();
  })
  .catch(done);
};
