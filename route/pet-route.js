'user strict';

const bearerAuth = require('../lib/bearer-auth-middleware');
const petController = require('../controller/pet-controller');


module.exports = function(router) {
  router.post('/child/:childId/pet', bearerAuth, (req, res) => {
    petController.postPet(req)
      .then(pet => res.status(201).json(pet))
      .catch(err => res.status(err));
  });

  router.get('/child/:childId/pet/:petId', bearerAuth, (req, res) => {
    return petController.getPet(req)
      .then(pet => res.status(200).json(pet))
      .catch(err => res.status(err));
  });

  router.put('/child/:childId/pet/:petId', (req, res) => {
    return petController.putPet(req)
      .then(pet => res.status(200).json(pet))
      .catch(err => res.status(err));
  });

  // router.delete('', bearerAuth, (req, res) => {
  //
  // });

  return router;
};
