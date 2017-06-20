'use strict';

const bearerAuth = require('../lib/bearer-auth-middleware');
const childController = require('../controller/child-controller');


module.exports = function(router){
  router.post('/user/:userId/child', bearerAuth, (req, res) => {
    childController.postChild(req)
    .then(child => res.status(201).json(child))
    .catch(err => res.status(err));
  });

  router.put('/user/:userId/child/:childId', bearerAuth, (req, res) => {
    return childController.putChild(req)
    .then(child => res.status(200).json(child))
    .catch(err => res.status(err.status).send(err.message));
  });

  router.get('/user/:userId/child/:childId', bearerAuth, (req, res) => {
    return childController.getChild(req)
    .then(child => {
      res.status(200).json(child);
    })
    .catch(err => res.status(err.status).send(err.message));
  });

  router.delete('/user/:userId/child/:childId', bearerAuth, (req, res) => {
    childController.deleteChild(req)
    .then(() => res.sendStatus(204))
    .catch(err => res.status(err.status).send(err.message));
  });

  return router;
};
