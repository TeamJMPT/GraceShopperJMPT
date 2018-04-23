import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import Sidebar from './sidebar';
import { fetchAllFromCart } from '../store/cart';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Checkout from './checkout'

class Cart extends Component {
    componentDidMount() {
        this.props.getAllFromCart(this.props.state.user.id);
    }

    render() {
        console.log("TRIPS", this.props.state.trips && this.props.cart)

        return (
            <div>
                <BootstrapTable data={this.props.cart}>
                    <TableHeaderColumn dataField={this.props.cart.trips && this.props.cart.trips.map(trip => trip.name)}>
                        Trip
                    </TableHeaderColumn>
                    <TableHeaderColumn isKey dataField='quantity'>
                        Quantity
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField='unitPrice'>
                        Price
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField='subTotal'>
                        Sub-Total
                    </TableHeaderColumn>
                </BootstrapTable>
                <h4>Your Total: {}</h4>
                <Checkout />
            </div>
        )
    }
}



const mapState = state => {
    return {
        state: state,
        cart: state.cart,
        trips: state.cart.trips
    }
}

const mapDispatch = (dispatch) => {
    return {
        getAllFromCart: (userId) => {
            dispatch(fetchAllFromCart(userId));
        }
    }
}

export default connect(mapState, mapDispatch)(Cart);

// item.trips.map(trip => {
//     return <ul key={trip.id}>{trip.name}, {trip.location}, {trip.cart.quantity}</ul>
// })


// <div className="container">
//     <Sidebar />
//     <div className="cart-title">
//         <h2>Your Cart</h2>
//     </div>
//     {
//         this.props.cart.map(item => {
//             return (
//                 <ul key={item.id}>{item.quantity}, {item.unitPrice}, {item.subTotal}</ul>
//             )
//         })
//     }
//     <div className="cart-total">
//         <h2>Total:</h2>
//         <button className="checkout">Checkout</button>
//     </div>
// </div>
