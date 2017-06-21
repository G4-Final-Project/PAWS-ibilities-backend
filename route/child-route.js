'use strict';

const bearerAuth = require('../lib/bearer-auth-middleware');
const childController = require('../controller/child-controller');


module.exports = function(router){
  router.post('/child', bearerAuth, (req, res) => {
    childController.postChild(req)
    .then(child => res.status(201).json(child))
    .catch(err => res.status(err));
  });

  router.put('/child/:childId', bearerAuth, (req, res) => {
    return childController.putChild(req)
    .then(child => res.status(200).json(child))
    .catch(err => res.status(err.status).send(err.message));
  });

  router.get('/child/:childId', bearerAuth, (req, res) => {
    return childController.getChild(req)
    .then(child => {
      res.status(200).json(child);
    })
    .catch(err => res.status(err.status).send(err.message));
  });

  router.get('/child', bearerAuth, (req, res) => {
    return childController.getAllChildren(req)
      .then(child => res.status(200).json(child));
  });

  router.delete('/child/:childId', bearerAuth, (req, res) => {
    childController.deleteChild(req)
    .then(() => res.sendStatus(204))
    .catch(err => res.status(err.status).send(err.message));
  });

  return router;
};
