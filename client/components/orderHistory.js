import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAllOrders } from '../store/orders';
import { fetchAllFromCart } from '../store/cart';

class OrderHistory extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount(){
        this.props.getAllOrders(this.props.user.id)
        this.props.getAllFromCart(this.props.user.id)
    }
    render(){
        console.log("order component : ", this.props.orders)
        // console.log("cart: ", this.props.cart)
        // const userData = this.props.user;
        // const date = userData.createdAt.slice(0,10);
        //  console.log('user date: ', date)

        return (
            <div className='orders'>
                <h3 className='your-order'>Your Orders</h3>
                {this.props.orders.map(order => {
                    return (
                    <div className="order-list"  key={order.id}>
                        <h5>Order Id: {order.id}</h5>
                        {/* <h5>{date}</h5> */}
                        <h5>Name: {order.trip}</h5>
                        <h5>Quantity: {order.quantity}</h5>
                        <h5>Subtotal: {`$${order.subTotal}`}</h5>
                        <h5>Status: {order.status}</h5>
                    </div>
                    )})
                }
            </div>
            
        )
    }  
}

const mapState = state => {
    return {
      orders: state.orders,
      user: state.user
    }
  }
  
  const mapDispatch = dispatch => {
   return {
     getAllOrders: (user) => {
       dispatch(fetchAllOrders(user));
     },
     getAllFromCart: (user) => {
        dispatch(fetchAllFromCart(user));
      }
   }
  }
  
export default connect(mapState, mapDispatch)(OrderHistory);