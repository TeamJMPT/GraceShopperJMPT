const router = require('express').Router()
const { Cart } = require('../db/models')
module.exports = router

// STRIPE
// These keys identify your account when you communicate with Stripe.
const keyPublishable = 'pk_test_KAqpimzvub4Yo7MM026ah30C'
const keySecret = 'sk_test_EDb5FTTy2icm6Qia71UkEbxq'
// import stripe module; accepts a single parameter, the secret key associated with your account.
const stripe = require('stripe')(keySecret)

const postStripeCharge = res => (stripeErr, stripeRes) => {
    console.log("stripeErr!", stripeErr, "stripeRes", stripeRes)
    if (stripeErr) res.status(500).send({error: stripeErr})
    else res.status(200).send({success: stripeRes})
}

//Want to get this working
// router.post('/payment', (req, res, next) => {
//     Cart.update({status: 'complete'}, {
//         where: {id: req.body.cartId},
//         returning: true
//     })
//     .then(arr => res.send('Cart is now completed!'));
// })

// A POST route (to the order history model) that receives the payment token ID and creates the charge
// on a post request, that you are already doing with axios from your React frontend application, you will use the Stripe library to create a official Stripe payment.
// The payment creation receives the incoming payload from your frontend application, all the credit card information and optional information, and a callback function that executes after the request to the Stripe API succeeds or fails.
// Afterward, you can send back a response to your React frontend application.
router.get('/payment', (req, res, next) => {
    res.send({message: 'Hello Stripe checkout server!', timestamp: new Date().toISOString})
})

router.post('/payment', (req, res, next) => {
    const request = { source: req.body.source, currency: req.body.currency, amount: req.body.amount}
    stripe.charges.create(request, postStripeCharge(res))
});
