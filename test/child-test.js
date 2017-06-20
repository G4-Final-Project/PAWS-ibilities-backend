// 'use strict';
//
// const tempChild = require('./lib/mock-child');
// const Child = require('../models/child');
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
// describe('CHILD ROUTES', function() {
//
//   afterEach((done) => {
//     Child.remove({})
//       .then(() => done())
//       .catch(done);
//   });
//
//   describe('POST CHILD', function() {
//     before(tempChild.bind(this));
//
//     it('should return a 201 on user created', done => {
//       chai.request(server)
//       .post('/api/child')
//       .send({
//         emailAddress:`test${this.tempChild.emailAddress}`,
//         name: `${this.tempChild.name}`,
//         phone: `${this.tempChild.phone}`})
//       .end((err, res) => {
//         expect(res).to.have.property('status')
//           .that.is.a('number')
//           .that.equals(201);
//         done();
//       });
//     });
//
//     it('should return a token when user created', done => {
//       chai.request(server)
//       .post('/api/child')
//       .send({
//         emailAddress:`test${this.tempChild.emailAddress}`,
//         name: `${this.tempChild.name}`,
//         phone: `${this.tempChild.phone}`})
//       .end((err, res) => {
//         expect(res).to.have.property('text')
//           .that.is.a('string')
//           .that.matches(/[A-Za-z0-9\-\._~\+\/]+=*/g);
//         done();
//       });
//     });
//
//     it('should return a 404 on bad route', done => {
//       chai.request(server)
//       .post('/api/parint')
//       .send({
//         emailAddress:`test${this.tempChild.emailAddress}`,
//         name: `${this.tempChild.name}`,
//         phone: `${this.tempChild.phone}`})
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
//       .post('/api/child')
//       .send({
//         name: `${this.tempChild.name}`,
//         phone: `${this.tempChild.phone}`})
//       .end((err, res) => {
//         expect(res).to.have.property('status')
//           .that.is.a('number')
//           .that.equals(400);
//         done();
//       });
//     });
//
//   it('should return a 400 on missing name', done => {
//     chai.request(server)
//     .post('/api/child')
//     .send({
//       emailAddress:`test${this.tempChild.emailAddress}`,
//       phone: `${this.tempChild.phone}`})
//     .end((err, res) => {
//       expect(res).to.have.property('status')
//         .that.is.a('number')
//         .that.equals(400);
//       done();
//     });
//   });
//
//   it('should return a 400 on missing phone number', done => {
//     chai.request(server)
//     .post('/api/child')
//     .send({
//       emailAddress:`test${this.tempChild.emailAddress}`,
//       name: `${this.tempChild.name}`,
//     .end((err, res) => {
//       expect(res).to.have.property('status')
//         .that.is.a('number')
//         .that.equals(400);
//       done();
//     });
//   });

  // describe('GET Child', function() {
  //   before(tempChild.bind(this));
  //
  //   it('should return a 200 on good request', done => {
  //     chai.request(server)
  //     .get('/api/child')
  //     .auth(`???`)
  //     .end((err, res) => {
  //       expect(res).to.have.property('status')
  //         .that.is.a('number')
  //         .that.equals(200);
  //       done();
  //     });
  //   });
  //
  //   it('should return an id when user logs in', done => {
  //     chai.request(server)
  //     .get('/api/child')
  //     .auth(`${this.tempChild.name}`, '123')
  //     .end((err, res) => {
  //       expect(res).to.have.property('text')
  //         .that.is.a('string')
  //         .that.matches(/[A-Za-z0-9\-\._~\+\/]+=*/g);
  //       done();
  //     });
  //   });
  //
  //   it('should return a 404 on bad route', done => {
  //     chai.request(server)
  //     .get('/api/parint')
  //     .auth(`test${this.tempChild.name}`, '123')
  //     .end((err, res) => {
  //       expect(res).to.have.property('status')
  //         .that.is.a('number')
  //         .that.equals(404);
  //       done();
  //     });
  //   });
  //
  //   it('should return a 401 with no auth header', done => {
  //     chai.request(server)
  //     .get('/api/child')
  //     .end((err, res) => {
  //       if(err) console.error(err.message);
  //       expect(res).to.have.property('status')
  //         .that.is.a('number')
  //         .that.equals(401);
  //       done();
  //     });
  //   });
  //
  //   it('should return a 401 on bad password', done => {
  //     chai.request(server)
  //     .get('/api/child')
  //     .auth(`test${this.tempChild.name}`, 'BADPASS')
  //     .end((err, res) => {
  //       expect(res).to.have.property('status')
  //         .that.is.a('number')
  //         .that.equals(401);
  //       done();
  //     });
  //   });
  //
  //   it('should return a 401 on missing password', done => {
  //     chai.request(server)
  //     .get('/api/child')
  //     .auth(`test${this.tempChild.emailAddress}`, '')
  //     .end((err, res) => {
  //       expect(res).to.have.property('status')
  //         .that.is.a('number')
  //         .that.equals(401);
  //       done();
  //     });
  //   });
  //
  //   it('should return a 401 on invalid emailAddress in request', done => {
  //     chai.request(server)
  //     .get('/api/child')
  //     .auth('nonsense', '123')
  //     .end((err, res) => {
  //       expect(res).to.have.property('status')
  //         .that.is.a('number')
  //         .that.equals(401);
  //       done();
  //     });
  //   });
  //
  //   it('should return a 401 on missing emailAddress in request', done => {
  //     chai.request(server)
  //     .get('/api/child')
  //     .auth(``, '123')
  //     .end((err, res) => {
  //       expect(res).to.have.property('status')
  //         .that.is.a('number')
  //         .that.equals(401);
  //       done();
  //     });
  //   });
  // });

//   describe('PUT Update Child data', function() {
//     before(tempChild.bind(this));
//
//     it('should return new value for key currentWeight on good request', done => {
//       chai.request(server)
//       .put(`/api/child/${this.tempChild._id}`)
//       .send({name: 'teji', name: 'moose'})
//       .set('Authorization', `Bearer ${this.tempToken}`)
//       .end((err, res) => {
//         if(err) console.error(err.message);
//         expect(res).to.have.property('body')
//           .that.has.property('name')
//           .that.is.a('string')
//           .that.equals('teji');
//         expect(res).to.have.property('body')
//           .that.has.property('name')
//           .that.is.a('string')
//           .that.equals('moose');
//         done();
//       });
//     });
//
//
//     it('should return a 200 on good request', done => {
//       chai.request(server)
//       .put(`/api/child/${this.tempChild._id}`)
//       .send({ name: 'teji' })
//       .set('Authorization', `Bearer ${this.tempToken}`)
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
//       .put('/api/child')
//       .send({})
//       .set('Authorization', `Bearer ${this.tempToken}`)
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
//       .put('/api/child/BADID')
//       .send({})
//       .set('Authorization', `Bearer ${this.tempToken}`)
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
//         .put(`/api/child/${this.tempChild._id}`)
//         .send({})
//         .set('Authorization', `Bearer ''`)
//         .end((err, res) => {
//           expect(res).to.have.property('status')
//             .that.is.a('number')
//             .that.equals(401);
//           done();
//         });
//     });
//
//     it('should return a 401 on invalid token type', done => {
//       chai.request(server)
//         .put(`/api/child/${this.tempChild._id}`)
//         .send({})
//         .set('Authorization', `MAC ${this.tempToken}`)
//         .end((err, res) => {
//           expect(res).to.have.property('status')
//             .that.is.a('number')
//             .that.equals(401);
//           done();
//         });
//     });
//
//   });
//
//   describe('DELETE route', function() {
//     before(tempChild.bind(this));
//
//     it('should return a 204 succesful delete', done => {
//       chai.request(server)
//       .delete(`/api/user/delete/${this.tempChild._id}`)
//       .set('Authorization', `Bearer ${this.tempToken}`)
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
//       .delete(`/api/foo/${this.tempChild._id}`)
//       .set('Authorization', `Bearer ${this.tempToken}`)
//       .end((err, res) => {
//         if(err) console.error(err.message);
//         expect(res).to.have.property('status')
//           .that.is.a('number')
//           .that.equals(404);
//         done();
//       });
//     });
//
//     it('should return a 404 on missing id', done => {
//       chai.request(server)
//       .delete('/api/child')
//       .set('Authorization', `Bearer ${this.tempToken}`)
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
//       .delete(`/api/child/${this.tempChild._id}`)
//       .set('Authorization', `MAC ${this.tempToken}`)
//       .end((err, res) => {
//         expect(res).to.have.property('status')
//           .that.is.a('number')
//           .that.equals(401);
//         done();
//       });
//     });
//   });
// });
