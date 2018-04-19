const router = require('express').Router()
const {Trip, Order, TripOrder} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  TripOrder.findAll({include: [{all: true}]})
    .then(orders => res.send(orders))
    .catch(next);
});