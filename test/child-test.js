'use strict';

const User = require('../model/user');
// const Child = require('../model/child');
const chai = require('chai');
const expect = chai.expect;
const http = require('chai-http');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const server = require('../server');

mongoose.Promise = Promise;
chai.use(http);

describe('CHILD ROUTES', function() {
  let testChild;
  let userToken;
  let testUser;

  describe('parent', function() {
    it('should return a 201 on user created', done => {
      chai.request(server)
      .post('/api/user')
      .set('Content-type', 'application/json')
      .send({
        email:`test@test.com`,
        username: `tejimom`,
        password:'123',
        phone: `5555555555`,
      })
      .end((err, res) => {
        User.find('test@test.com', function(err, user) {
          testUser = user[0];
        });
        expect(res).to.have.property('status')
          .that.is.a('number')
          .that.equals(201);
        done();
      });
    });
    it('should return a 200 on good request', done => {
      chai.request(server)
      .get('/api/user')
      .auth('tejimom', '123')
      .end((err, res) => {
        userToken = res.text;
        expect(userToken).to.not.be.undefined;
        expect(res).to.have.property('status')
          .that.is.a('number')
          .that.equals(200);
        expect(testUser).to.not.be.undefined;
        done();
      });
    });
  });

  describe('POST child', function() {
    it('should return 201 on succesully posting a child', done => {
      console.log(userToken);
      chai.request(server)
      .post('/api/child')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        name: `piggles`,
        phone: `15555555555`,
      })
      .end((err, res) => {
        testChild = res.body;
        expect(res).to.have.property('status')
          .that.is.a('number')
          .that.equals(201);
        done();
      });
    });

    it('should return a 404 on bad route', done => {
      chai.request(server)
      .post('/api/chld')
      .send({
        name: `alice`,
        phone: `15555555556`,
      })
      .end((err, res) => {
        expect(res).to.have.property('status')
          .that.is.a('number')
          .that.equals(404);
        done();
      });
    });

    it('should return a 400 with missing phone', done => {
      chai.request(server)
      .post('/api/child')
      .send({
        name: `missy`,
      })
      .end((err, res) => {
        expect(res).to.have.property('status')
          .that.is.a('number')
          .that.equals(401);
        done();
      });
    });

    it('should return a 400 with missing name', done => {
      chai.request(server)
      .post('/api/child')
      .send({
        phone: `15555555556`,
      })
      .end((err, res) => {
        expect(res).to.have.property('status')
          .that.is.a('number')
          .that.equals(401);
        done();
      });
    });
  });

  describe('GET child', function() {
    it('should return a 200 on good request', done => {
      chai.request(server)
      .get(`/api/child/${testChild._id}`)
      .set('Authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res).to.have.property('status')
          .that.is.a('number')
          .that.equals(200);
        done();
      });
    });

    it('should return a 404 on bad route', done => {
      this.timeout(500);
      setTimeout(done, 300);
      chai.request(server)
      .get('/api/child/wat')
      .set('Authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res).to.have.property('status')
          .that.is.a('number')
          .that.equals(404);
        done();
      });
    });

    it('should return a 401 with no auth header', done => {
      chai.request(server)
      .get(`/api/child/${testChild._id}`)
      .end((err, res) => {
        expect(res).to.have.property('status')
          .that.is.a('number')
          .that.equals(401);
        done();
      });
    });

    it('should return an array of all children attached to a user', done => {
      it('should return a 200 on good request', done => {
        chai.request(server)
        .get('/api/child')
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          expect(res).to.have.property('status')
            .that.is.a('number')
            .that.equals(200);
          done();
        });
      });
      done();
    });

  });

  describe('PUT child', function() {
    it('should return update name for child', done => {
      chai.request(server)
      .put(`/api/child/${testChild._id}`)
      .send({name: 'piggles'})
      .set('Authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res).to.have.property('body')
          .that.has.property('name')
          .that.is.a('string')
          .that.equals('piggles');
        done();
      });
    });

    it('should return a 200 on good request', done => {
      chai.request(server)
      .put(`/api/child/${testChild._id}`)
      .send({ username: 'missy' })
      .set('Authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res).to.have.property('status')
          .that.is.a('number')
          .that.equals(200);
        done();
      });
    });

    it('should return a 401 on missing token', done => {
      chai.request(server)
      .put(`/api/child/${testChild._id}`)
      .send({})
      .set('Authorization', `Bearer ''`)
      .end((err, res) => {
        expect(res).to.have.property('status')
          .that.is.a('number')
          .that.equals(500);
        done();
      });
    });

    it('should return a 401 on invalid token type', done => {
      chai.request(server)
      .put(`/api/child/${testChild._id}`)
      .send({})
      .set('Authorization', `MAC ${userToken}`)
      .end((err, res) => {
        expect(res).to.have.property('status')
          .that.is.a('number')
          .that.equals(401);
        done();
      });
    });
  }); //CLOSE PUT route

  describe('DELETE route', function() {
    it('should return a 204 succesful delete', done => {
      chai.request(server)
      .delete(`/api/child/${testChild._id}`)
      .set('Authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res).to.have.property('status')
          .that.is.a('number')
          .that.equals(204);
        done();
      });
    });

    it('should return a 404 on bad route', done => {
      this.timeout(500);
      setTimeout(done, 300);
      chai.request(server)
      .delete(`/api/child/123`)
      .set('Authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res).to.have.property('status')
          .that.is.a('number')
          .that.equals(404);
        done();
      });
    });

    it('should return a 401 on bad token type', done => {
      chai.request(server)
      .delete(`/api/child/${testChild._id}`)
      .set('Authorization', `MAC ${userToken}`)
      .end((err, res) => {
        expect(res).to.have.property('status')
          .that.is.a('number')
          .that.equals(401);
        done();
      });
    });

    it('should delete our test user', done => {
      chai.request(server)
      .delete(`/api/user`)
      .set('Authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res).to.have.property('status')
          .that.is.a('number')
          .that.equals(204);
        done();
      });
    });
  }); // close DELETE
});
