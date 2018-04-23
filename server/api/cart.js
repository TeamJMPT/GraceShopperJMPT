<<<<<<< HEAD
const router = require('express').Router()
const { Trip, Order } = require('../db/models')
module.exports = router;

//Coming to api/cart either to get the things in my cart, add something else to my cart, update my cart, or to purchase what's in my cart.
//I can do this either logged in or as a vistor who's logged out.
//If I'm logged in my cart will be associated with my userId. If not, I need a cartId on my session (which will be the orderId in the db) so that I can still access my cart when I come back to the site.


router.use(async (req, res, next) => {
  // console.log("CART??", req.cart)
  // console.log("req.session", req.session)
  //if there is already a req.cart then just next()
  if (req.cart) return next();

  //if there is a cartId on req.session, set req.cart to the correct instance of order and exit
  if (req.session.cartId) {
    console.log("in req.session.cartId", req.session.cartId)
    req.cart = await Order.findById(req.session.cartId).catch(next);
    return next();
  }

  //if neither of those two things happened, set req.cart to a new instance of Order and set the cartId to req.cart.id
  else {
    req.cart = await Order.create().catch(next);
    req.session.cartId = req.cart.id;
    console.log('req.session in cart.js', req.session);
    next();
  }
});

// router.use('/', (req, res, next) => {
//   if (req.user) console.log("REQ.USER", req.user.id)
//   console.log("here is an already created req.session.cartId", req.session.cartId)
//   const reqSession = req.session
//   if (!reqSession.cartId) {
//     reqSession.cartId = null;
//     Order.create()
//       .then(newCart => {
//         reqSession.cartId = newCart.dataValues.id
//         console.log("HERE IS CARTID", req.sessions.cartId)
//       })
//   }
//   next();
// })

router.get('/', (req, res, next) => {
  console.log("req.session", req.session)
  Order.findAll({
    where: { id: req.session.cartId },
    include: [{ model: Trip }]
  })
    .then(orders => res.send(orders))
    .catch(next);
});


router.put('/', (req, res, next) => {
  Order.update({})

})
=======

>>>>>>> master
