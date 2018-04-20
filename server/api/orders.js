const router = require('express').Router()
const {Trip, Order, TripOrder} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Order.findAll({
    include: [{
      model: Trip,
    }]
  })
    .then(orders => res.send(orders))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Order.findAll( {
    where: {
      id: req.params.id
    },
    include: [{
      model: Trip,
    }]
  })
    .then(orders => res.send(orders))
    .catch(next);
});

// router.post('/:orderId', (req, res, next) => {
//   TripOrder.create(req.body)
//     .then(newOrder => res.send(newOrder))
//     .catch(next)
// })
