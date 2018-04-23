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
         console.log("CART!", this.props.cart)
        return (
            <div className="container">
                <Sidebar />
                <div className="cart-title">
                <h2>Your Cart</h2>
                </div>
                {
                    this.props.cart.map(item => {
                        return item.trips.map(trip => {
                            return <ul key={trip.id}>{trip.name}, {trip.location}, {trip.tripOrder.quantity}</ul>
                        })
                    })
                }
                <div className="cart-total">
                <h2>Total:</h2>
                <button className="checkout">Checkout</button>
                </div>
            </div>
        )
     }
 }



const mapState = state => {
    return {
        state: state,
        cart: state.cart
    }
}

const mapDispatch = (dispatch) => {
    return {
        getAllFromCart: () => {
            dispatch(fetchAllFromCart());
        }
    }
}

export default connect(mapState, mapDispatch)(Cart);
