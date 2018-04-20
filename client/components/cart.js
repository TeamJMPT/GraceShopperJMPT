import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Sidebar from './sidebar';

 const Cart = props => {

    return(
        <div className="container">
            <Sidebar />
            <div className="cart-title">
            <h2>Your Cart</h2>
            </div>
            <div className="cart-total">
            <h2>Total:</h2>
            <button>Checkout</button>
            </div>
        </div>    
    )
}
const mapState = state => {

}

export default connect(mapState)(Cart);
