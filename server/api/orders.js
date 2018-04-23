const router = require('express').Router()
const {Trip, Order, Cart } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => { // authorization - admin can find all, should filter for all other peoples -- KHLW
  // const filter = req.user ? req.user.isAdmin ? {} : {userId: req.user.id} : {sessionId: req.session.id}
  Order.findAll({
    include: [{ // defaultScope if you are always including when you request orders -- KHLW
      model: Trip
    }]
  })
    .then(orders => res.send(orders))
    .catch(next);
});

router.get('/:userId', (req, res, next) => { // selfOrAdmin. `/api/orders/user/:userId` -- KHLW
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
    console.log("REQ.BODY!!", req.body) // logs in master -- KHLW
    // delete req.body.status
  Order.create(req.body) // consider deleting the status so someone can't corrupt your data -- KHLW
    .then(order => {
      order.addTrip(req.body.tripId)
    })
    .then(order => res.send(order))
    .catch(next)
})

  // .then((order) => Cart.create({ orderId: order.orderId, tripId: req.body.tripId }))
  // .then()
