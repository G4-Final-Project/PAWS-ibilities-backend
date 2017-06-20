// 'use strict';
//
// const User = require('../model/user');
// const chai = require('chai');
// const expect = chai.expect;
// const http = require('chai-http');
// const Promise = require('bluebird');
// const mongoose = require('mongoose');
// const server = require('../server');
//
// mongoose.Promise = Promise;
// chai.use(http);
//
// describe('USER ROUTES', function() {
//   let userToken;
//   let testUser;
//
//   describe('POST User', function() {
//     it('should return a 201 on user created', done => {
//       chai.request(server)
//       .post('/api/user')
//       .set('Content-type', 'application/json')
//       .send({
//         email:`test@test.com`,
//         username: `tejimom`,
//         password:'123',
//         phone: `5555555555`,
//       })
//       .end((err, res) => {
//         userToken = res.body.token;
//         User.find('test@test.com', function(err, user) {
//           testUser = user[0];
//         });
//         expect(userToken).to.not.be.undefined;
//         expect(res).to.have.property('status')
//           .that.is.a('number')
//           .that.equals(201);
//         expect(res).to.have.property('text')
//           .that.is.a('string')
//           .that.matches(/[A-Za-z0-9\-\._~\+\/]+=*/g);
//         expect(userToken).to.match(/[A-Za-z0-9\-\._~\+\/]+=*/g);
//         done();
//       });
//     });
//
//     it('should return a 404 on bad route', done => {
//       chai.request(server)
//       .post('/api/parint')
//       .send({
//         email:`test@test.net`,
//         username: `tejimum`,
//         password:'123',
//         phone: `5555555556`,
//       })
//       .end((err, res) => {
//         expect(res).to.have.property('status')
//           .that.is.a('number')
//           .that.equals(404);
//         done();
//       });
//     });
//
//     it('should return a 400 with missing Email', done => {
//       chai.request(server)
//       .post('/api/user')
//       .send({
//         username: `teji`,
//         password:'123',
//         phone: `5555555566`,
//       })
//       .end((err, res) => {
//         expect(res).to.have.property('status')
//           .that.is.a('number')
//           .that.equals(400);
//         done();
//       });
//     });
//
//     it('should return a 400 with missing Password', done => {
//       chai.request(server)
//       .post('/api/user')
//       .send({
//         email:`test@mail.com`,
//         username: `teji`,
//         phone: `5555555566`,
//       })
//       .end((err, res) => {
//         expect(res).to.have.property('status')
//           .that.is.a('number')
//           .that.equals(400);
//         done();
//       });
//     });
//
//     it('should return a 400 on missing username', done => {
//       chai.request(server)
//       .post('/api/user')
//       .send({
//         email:`test@meowth.com`,
//         password:'123',
//         phone: `8008008552`,
//       })
//       .end((err, res) => {
//         expect(res).to.have.property('status')
//           .that.is.a('number')
//           .that.equals(400);
//         done();
//       });
//     });
//
//     it('should return a 400 on missing phone number', done => {
//       chai.request(server)
//       .post('/api/user')
//       .send({
//         email:`test@email.com`,
//         username: `moose`,
//         password:'123',
//       })
//       .end((err, res) => {
//         expect(res).to.have.property('status')
//           .that.is.a('number')
//           .that.equals(400);
//         done();
//       });
//     });
//   });
//
//
//   describe('GET User', function() {
//
//     it('should return a 200 on good request', done => {
//       chai.request(server)
//       .get('/api/user')
//       .auth('tejimom', '123')
//       .end((err, res) => {
//         let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//         expect(res).to.have.property('status')
//           .that.is.a('number')
//           .that.equals(200);
//         expect(res).to.have.property('text')
//           .that.is.a('string')
//           .that.matches(/[A-Za-z0-9\-\._~\+\/]+=*/g);
//         expect(testUser).to.have.property('email').that.matches(pattern);
//         done();
//       });
//     });
//
//     it('should return a 404 on bad route', done => {
//       chai.request(server)
//       .get('/api/parint')
//       .auth('tejimom', '123')
//       .end((err, res) => {
//         expect(res).to.have.property('status')
//           .that.is.a('number')
//           .that.equals(404);
//         done();
//       });
//     });
//
//     it('should return a 401 with no auth header', done => {
//       chai.request(server)
//       .get('/api/user')
//       .end((err, res) => {
//         expect(res).to.have.property('status')
//           .that.is.a('number')
//           .that.equals(401);
//         done();
//       });
//     });
//
//     // it('should return a 401 on bad password', done => {
//     //   chai.request(server)
//     //   .get('/api/user')
//     //   .auth('tejimom', 'BADPASS')
//     //   .end((err, res) => {
//     //     expect(res).to.have.property('status')
//     //       .that.is.a('number')
//     //       .that.equals(401);
//     //     done();
//     //   });
//     // });
//
//     it('should return a 401 on missing password', done => {
//       chai.request(server)
//       .get('/api/user')
//       .auth('tejimom', '')
//       .end((err, res) => {
//         expect(res).to.have.property('status')
//           .that.is.a('number')
//           .that.equals(401);
//         done();
//       });
//     });
//
//     // it('should return a 401 on invalid username in request', done => {
//     //   chai.request(server)
//     //   .get('/api/user')
//     //   .auth('nonsense', '123')
//     //   .end((err, res) => {
//     //     expect(res).to.have.property('status')
//     //       .that.is.a('number')
//     //       .that.equals(401);
//     //     done();
//     //   });
//     // });
//
//     it('should return a 401 on missing username in request', done => {
//       chai.request(server)
//       .get('/api/user')
//       .auth('', '123')
//       .end((err, res) => {
//         expect(res).to.have.property('status')
//           .that.is.a('number')
//           .that.equals(401);
//         done();
//       });
//     });
//   }); // close GET route
//
//   describe('PUT Update User data', function() {
//     it('should return new value for key currentWeight on good request', done => {
//       chai.request(server)
//       .put(`/api/user/${testUser.id}`)
//       .send({username: 'teji'})
//       .set('Authorization', `Bearer ${userToken}`)
//       .end((err, res) => {
//         expect(res).to.have.property('body')
//           .that.has.property('username')
//           .that.is.a('string')
//           .that.equals('teji');
//         done();
//       });
//     });
//
//     it('should return a 200 on good request', done => {
//       chai.request(server)
//       .put(`/api/user/${testUser.id}`)
//       .send({ username: 'teji' })
//       .set('Authorization', `Bearer ${userToken}`)
//       .end((err, res) => {
//         expect(res).to.have.property('status')
//           .that.is.a('number')
//           .that.equals(200);
//         done();
//       });
//     });
//
//     it('should return a 404 missing id', done => {
//       chai.request(server)
//       .put('/api/user')
//       .send({})
//       .set('Authorization', `Bearer ${userToken}`)
//       .end((err, res) => {
//         expect(res).to.have.property('status')
//           .that.is.a('number')
//           .that.equals(404);
//         done();
//       });
//     });
//
//     it('should return a 404 bad id', done => {
//       chai.request(server)
//       .put('/api/user/BADID')
//       .send({})
//       .set('Authorization', `Bearer ${userToken}`)
//       .end((err, res) => {
//         expect(res).to.have.property('status')
//           .that.is.a('number')
//           .that.equals(404);
//         done();
//       });
//     });
//
//     it('should return a 401 on missing token', done => {
//       chai.request(server)
//       .put(`/api/user/${testUser.id}`)
//       .send({})
//       .set('Authorization', `Bearer ''`)
//       .end((err, res) => {
//         expect(res).to.have.property('status')
//           .that.is.a('number')
//           .that.equals(500);
//         done();
//       });
//     });
//
//     it('should return a 401 on invalid token type', done => {
//       chai.request(server)
//       .put(`/api/user/${testUser.id}`)
//       .send({})
//       .set('Authorization', `MAC ${userToken}`)
//       .end((err, res) => {
//         expect(res).to.have.property('status')
//           .that.is.a('number')
//           .that.equals(401);
//         done();
//       });
//     });
//   }); //CLOSE PUT route
//
//   describe('DELETE route', function() {
//     it('should return a 204 succesful delete', done => {
//       chai.request(server)
//       .delete(`/api/user/${testUser.id}`)
//       .set('Authorization', `Bearer ${userToken}`)
//       .end((err, res) => {
//         expect(res).to.have.property('status')
//           .that.is.a('number')
//           .that.equals(204);
//         done();
//       });
//     });
//
//     it('should return a 404 on bad route', done => {
//       chai.request(server)
//       .delete(`/api/foo/${testUser.id}`)
//       .set('Authorization', `Bearer ${userToken}`)
//       .end((err, res) => {
//         expect(res).to.have.property('status')
//           .that.is.a('number')
//           .that.equals(404);
//         done();
//       });
//     });
//
//     it('should return a 404 on missing id', done => {
//       chai.request(server)
//       .delete('/api/user')
//       .set('Authorization', `Bearer ${userToken}`)
//       .end((err, res) => {
//         expect(res).to.have.property('status')
//           .that.is.a('number')
//           .that.equals(404);
//         done();
//       });
//     });
//
//     it('should return a 401 on bad token type', done => {
//       chai.request(server)
//       .delete(`/api/user/${testUser.id}`)
//       .set('Authorization', `MAC ${userToken}`)
//       .end((err, res) => {
//         expect(res).to.have.property('status')
//           .that.is.a('number')
//           .that.equals(401);
//         done();
//       });
//     });
//   }); // close DELETE
// });
