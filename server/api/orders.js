const router = require('express').Router()
const {Trip, Order, Cart } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Order.findAll({
    include: [{
      model: Trip
    }]
  })
    .then(orders => res.send(orders))
    .catch(next);
});

router.get('/:userId', (req, res, next) => {
  Order.findAll( {
    where: {
      userId: req.params.userId
    },
    include: [{
      model: Trip
    }]
  })
    .then(orders => res.send(orders))
    .catch(next);
});

router.post('/:userId', (req, res, next) => {
    console.log("REQ.BODY!!", req.body)
  Order.create(req.body)
    .then(order => {
      order.addTrip(req.body.tripId)
    })
    .then(order => res.send(order))
    .catch(next)
})

  // .then((order) => Cart.create({ orderId: order.orderId, tripId: req.body.tripId }))
  // .then()
