import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllFromCart } from '../store/cart';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Checkout from './checkout'

class Cart extends Component {
    // constructor() {
    //     super()
    //     this.getTotal = this.getTotal.bind(this);
    // }

    componentDidMount() {
        this.props.getAllFromCart(this.props.state.user.id);
    }

    // getTotal() {
    //     this.props.cart.length && this.props.cart.reduce((acc, curr) => {
    //         return acc + curr.subTotal
    //     }, 0)
    // }

    render() {
        console.log("CART!", this.props.cart)
        // console.log("TOTAL!");
        let notEmpty = this.props.cart.length;
        let trip;

        return (
            <div key={this.props.cart.tripId}>
                <BootstrapTable data={this.props.cart}>
                    <TableHeaderColumn dataField="trip">
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
                <Link className='orders' to="/orders"><h3>See Order History</h3></Link>
                <h4 className='total'>Your Total: {
                    notEmpty ?
                    this.props.cart.reduce((acc, curr) => {
                            return acc + curr.subTotal
                        }, 0)
                    : 0}
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
