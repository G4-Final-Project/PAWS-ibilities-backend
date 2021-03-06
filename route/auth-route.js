'use strict';

const basicAuth = require('../lib/basic-auth-middleware');
const bearerAuth = require('../lib/bearer-auth-middleware');
const authCntrl = require('../controller/auth-controller');

module.exports = function(router) {
  router.post('/user', (req, res) => {
    authCntrl.createUser(req)
      .then(token => res.status(201).send(token))
      .catch(err => res.status(400).send(err.message));
  });

  router.get('/user', basicAuth, (req, res) => {

    authCntrl.fetchUser(req)
      .then(token => res.status(200).send(token))
      .catch(err => res.status(res.status).send(err.message));
  });

  router.put('/user', bearerAuth, (req, res) => {
    authCntrl.updateUser(req)
      .then(data => {
        res.json(data);
      })
      .catch(err => res.status(err.status).send(err.message));
  });


  router.delete('/user', bearerAuth, (req, res) => {
    authCntrl.deleteUser(req)
    .then(() => res.sendStatus(204))
    .catch(err => res.send(err.message));
  });
  return router;
};
