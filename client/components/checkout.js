import React from 'react'
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout'

// define the URL of your server.
const PAYMENT_SERVER_URL = process.env.NODE_ENV === 'production'
? 'http://putherokuhere.com' //replace with heroku domain???
: 'http://localhost:8080/api/checkout/payment';

// API token
const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'product'
? 'pk_test_KAqpimzvub4Yo7MM026ah30C' //publishable key
: 'pk_test_KAqpimzvub4Yo7MM026ah30C'; //test key

const CURRENCY = 'USD';

const successPayment = data => alert('Payment Successful!');
const errorPayment = data => alert('Payment Error!')

// The most important prop is the token handler. There you can pass your callback function that will be triggered when the user submits the credit card information. The component library already creates the token for you in this callback function.
const onToken = (amount, cartId) => token => {
    axios.post('/api/checkout/payment', {
        source: token.id,
        currency: CURRENCY,
        amount: amount,
        cartId: cartId
    })
    .then(successPayment)
    .catch(errorPayment);
}

const Checkout = ({amount, cartId}) => {
    return (
        <div>
        {console.log("Total?", amount)}
        <StripeCheckout
            amount={amount}
            token={onToken(amount)}
            currency={CURRENCY}
            stripeKey={'pk_test_KAqpimzvub4Yo7MM026ah30C'}
        />
        </div>
    )
}

export default Checkout;
