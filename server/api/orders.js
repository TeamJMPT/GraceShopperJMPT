const router = require('express').Router()
const {Trip, Order, TripOrder} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  TripOrder.findAll()
    .then(orders => res.send(orders))
    .catch(next);
});

router.get('/:orderId', (req, res, next) => {
  TripOrder.findAll( {
    where: {
      orderId: req.params.orderId
    }
  })
    .then(orders => res.send(orders))
    .catch(next);
});

router.post('/:orderId', (req, res, next) => {
  TripOrder.create(req.body)
    .then(newOrder => res.send(newOrder))
    .catch(next)
})