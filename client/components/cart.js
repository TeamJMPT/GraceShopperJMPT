import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Sidebar from './sidebar';
import { fetchAllFromCart } from '../store/cart';

 class Cart extends Component {
     componentDidMount() {
         this.props.getAllFromCart();
     }

     render() {
        console.log('Cart props: ', this.props)
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
 }



const mapState = state => {
    return {
        orders: state.orders
    }
}

const mapDispatch = dispatch => {
    return {
        getAllFromCart: () => {
            dispatch(fetchAllFromCart());
        }
    }
}

export default connect(mapState, mapDispatch)(Cart);
