const router = require('express').Router()
const {Trip, Order } = require('../db/models')
module.exports = router

// router.get('/', (req, res, next) => {
//   Order.findAll({
//     include: [{
//       model: Trip
//     }]
//   })
//     .then(orders => res.send(orders))
//     .catch(next);
// });

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
  Order.createOrFind({
    where: {id: req.params.orderId},
    include: [{model: Trip}]
  }, req.body)
    .then(newOrder => res.send(newOrder))
    .catch(next)
})

router.get('/', (req, res, next) => {
  req.session.cart = []
  console.log("here is session!", req.session)
})
