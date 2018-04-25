const router = require('express').Router()
const {Trip, Order, Cart, User } = require('../db/models')
module.exports = router

//only admins are authorized to access this route
router.get('/', (req, res, next) => {
  req.user && req.user.isAdmin ?
    Order.findAll({
      include: [{
       model: Trip
      }]
    })
     .then(orders => res.send(orders))
      .catch(next)
    : res.send("Unauthorized. You do not have access.");
});

//Middleware for routes to /api/orders/user/:userId
router.use('/user/:userId', (req, res, next) => {
  User.findById(req.params.userId)
    .then(user => user.getCarts())
    .then(carts => {
      const returned = carts.filter(cart => (cart.status === 'pending'))
      if (returned.length !== 0) {
        next();
      } else {
        Cart.create({userId: req.params.userId})
        next();
      }
    })
})

//get a user's cart
router.get('/user/:userId', (req, res, next) => {
  Cart.findOne({
    where: {
      userId: req.params.userId,
      status: 'pending'
    }
  })
  .then(cart => {
    return cart.getOrders({include: [{model: Trip}]});
  })
  .then(orders => {
    const send = orders.map(order => {
        return {
          subTotal: order.subTotal,
          quantity: order.quantity,
          id: order.id,
          unitPrice: order.unitPrice,
          tripId: order.tripId,
          cartId: order.cartId,
          trip: order.trip.name
        }
      });
    res.send(send);
    })
  .catch(next);
});

// router.get('/history/user/:userId', (req, res, next) => {
//   Cart.findAll({where: {userId: req.params.userId}})
//     .then(carts => carts.filter(cart => cart.status === 'complete'))
//     .then(completedCarts => res.send(completedCarts))
//     .catch(next);
// })

//post a new line item to a user's cart
router.post('/user/:userId', (req, res, next) => {
    User.findById(req.params.userId)
    .then(user => user.getCarts())
    .then(carts => {
      const returned = carts.filter(cart => (cart.status === 'pending'))
      return returned
    })
    .then(cart => {
      return Order.create({ quantity: req.body.quantity, unitPrice: req.body.unitPrice, tripId: req.body.tripId, cartId: cart[0].dataValues.id})
    })
    .then(order => {
      res.send(order);
      })
    .catch(next);
});

// delete an item from the cart
router.get('/:orderId', (req, res, next) => {
    Order.findById(req.params.orderId)
    .then(order => res.send(order))
    .catch(next)
})

router.delete('/:orderId', (req, res, next) => {
    Order.destroy({
      where: {
        id: req.params.orderId
      }
    })
    .then(() => {
      res.sendStatus(204)
    })
    .catch(next)
})
