const router = require('express').Router()
const {Trip, Category} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Trip.findAll({include: [{all: true}]})
    .then(trips => res.send(trips))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
    Trip.findById(req.params.id)
    .then(trip => res.send(trip))
    .catch(next)
});
