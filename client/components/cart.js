import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllFromCart } from '../store/cart';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class Cart extends Component {
    componentDidMount() {
        this.props.getAllFromCart(this.props.state.user.id);
    }

    render() {
        let total = 0;
        let notEmpty = this.props.cart.length;

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
                <Link className='order-link' to="/orders"><h3 className='order-history'>See Order History</h3></Link>
                <h4 className='total'>Your Total: {
                    notEmpty ?
                    this.props.cart.map(item => {
                        return total + item['subTotal']
                    })
                        .reduce((acc, cur) => acc + cur, 0)
                  : 0}
                </h4>
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
