import React from 'react'
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout'

// define the URL of your server.
const PAYMENT_SERVER_URL = process.env.NODE_ENV === 'production'
? 'http://myapidomain.com' //replace with heroku domain???
: 'http://localhost:8080';

// API token
const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'product'
? 'pk_test_KAqpimzvub4Yo7MM026ah30C' //publishable key
: 'sk_test_EDb5FTTy2icm6Qia71UkEbxq'; //test key

const CURRENCY = 'USA';

// The most important prop is the token handler. There you can pass your callback function that will be triggered when the user submits the credit card information. The component library already creates the token for you in this callback function.
const onToken = (amount, description) => token => {
    axios.post(PAYMENT_SERVER_URL, {
        description: description,
        source: token.id,
        currency: CURRENCY,
        amount: amount
    })
    .then(res => res.data)
    .catch(console.error);
}

const Checkout = ({ name, description, amount }) => {
    return (
        <StripeCheckout
            name={name}
            description={description}
            amount={amount}
            token={onToken(amount, description)}
            currency={CURRENCY}
            stripeKey={STRIPE_PUBLISHABLE}
        />
    )
}

export default Checkout;
