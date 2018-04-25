import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllFromCart, removeItem } from '../store/cart';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Checkout from './checkout'

class Cart extends Component {

    componentDidMount() {
        this.props.getAllFromCart(this.props.state.user.id);
    }

    render() {
        console.log("OrderId", this.props.cart)
        let notEmpty = this.props.cart.length;
        return (
            <div>
                <BootstrapTable data={this.props.cart}>
                    <TableHeaderColumn
                        isKey dataField='trip'
                        dataAlign='center'
                        headerAlign='center'
                        width="20%">
                        Trip
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField='quantity'
                        dataAlign='center'
                        headerAlign='center'
                        width="20%">
                        Quantity
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField='unitPrice'
                        dataAlign='center'
                        headerAlign='center'
                        width="20%">
                        Price
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField='subTotal'
                        dataAlign='center'
                        headerAlign='center'
                        width="20%">
                        Sub-Total
                    </TableHeaderColumn>
                </BootstrapTable>
                {
                    this.props.cart && this.props.cart.map(item => {
                        return (
                            <button
                                    type="button"
                                    onClick={() => this.props.deleteItem(item.id)}>
                                    Delete {item.quantity} tickets to {item.trip}
                                </button>)
                })
                }
                <Link className='order-link' to="/orders"><h3 className='order-history'>See Order History</h3></Link>
                <h4 className='total'>Your Total: {
                    notEmpty ?
                    this.props.cart.reduce((acc, curr) => {
                            return acc + curr.subTotal
                        }, 0)
                    : 0
                }
                </h4>
                <Checkout
                name="hello"
                description="goodbye"
                cartId={this.props.cart.id}
                amount={this.props.cart.reduce((acc, curr) => {
                    return acc + curr.subTotal
                }, 0)}
                />
            </div>
        )
    }
}

const mapState = state => {
    return {
        state: state,
        cart: state.cart,
        trips: state.cart.trips,
        // orderId: state.cart.trips.map(trip => trip.orderId)
    }
}

const mapDispatch = (dispatch) => {
    return {
        getAllFromCart: (userId) => {
            dispatch(fetchAllFromCart(userId));
        },
        deleteItem: (orderId) => {
            dispatch(removeItem(orderId))
        }
    }
}

export default connect(mapState, mapDispatch)(Cart);

// <TableHeaderColumn
//     dataField='id'
//     dataAlign='center'
//     headerAlign='center'
//     width='20%'
//     dataFormat={this.cellButton}>
//     Remove
//                     </TableHeaderColumn>
