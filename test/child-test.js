// 'use strict';
//
// const User = require('../model/user');
// // const Child = require('../model/child');
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
// describe.only('CHILD ROUTES', function() {
//   // let testChild;
//   let userToken;
//   let testUser;
//
//   describe('parent', function() {
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
//         userToken = res.text;
//         User.find('test@test.com', function(err, user) {
//           testUser = user[0];
//         });
//         expect(userToken).to.not.be.undefined;
//         expect(res).to.have.property('status')
//           .that.is.a('number')
//           .that.equals(201);
//         done();
//       });
//     });
//     it('should return a 200 on good request', done => {
//       chai.request(server)
//       .get('/api/user')
//       .auth('tejimom', '123')
//       .end((err, res) => {
//         expect(res).to.have.property('status')
//           .that.is.a('number')
//           .that.equals(200);
//         expect(testUser).to.not.be.undefined;
//         done();
//       });
//     });
//   });
//
//   describe('POST child', function() {
//     it('should return 201 on succesully posting a child', done => {
//       this.timeout(3000);
//       setTimeout(done, 3000);
//       chai.request(server)
//       .post('/api/child')
//       .set('Authorization', `Bearer ${userToken}`)
//       .send({
//         username: `piggles`,
//         phone: `15555555555`,
//       })
//       .end((err, res) => {
//         console.log(res.body);
//         expect(res).to.have.property('status')
//           .that.is.a('number')
//           .that.equals(201);
//         done();
//       });
//     });
//
//     it('should return a 404 on bad route', done => {
//       chai.request(server)
//       .post('/api/chld')
//       .send({
//         username: `alice`,
//         phone: `15555555556`,
//       })
//       .end((err, res) => {
//         expect(res).to.have.property('status')
//           .that.is.a('number')
//           .that.equals(404);
//         done();
//       });
//     });
//
//     it('should return a 400 with missing phone', done => {
//       chai.request(server)
//       .post('/api/child')
//       .send({
//         username: `missy`,
//       })
//       .end((err, res) => {
//         expect(res).to.have.property('status')
//           .that.is.a('number')
//           .that.equals(401);
//         done();
//       });
//     });
//
//     it('should return a 400 with missing username', done => {
//       chai.request(server)
//       .post('/api/child')
//       .send({
//         phone: `15555555556`,
//       })
//       .end((err, res) => {
//         expect(res).to.have.property('status')
//           .that.is.a('number')
//           .that.equals(401);
//         done();
//       });
//     });
//
//
//
//   });
// });
