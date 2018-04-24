import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAllOrders } from '../store/orders';

class OrderHistory extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount(){
        this.props.getAllOrders()
    }
    render(){
        console.log("order component : ", this.props.orders)
        return (
            <div className='orders'>
                <h3>Your Orders</h3>
                {this.props.orders.map(order => {
                    const date = order.createdAt.slice(0,10);
                    return (
                    <div className=""  key={order.id}>
                        <h5>{order.id}</h5>
                        <h5>{date}</h5>
                        <h5>{`$${order.subTotal}`}</h5>
                        <h5>{order.status}</h5>
                    </div>
                    )})
                }
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
     getAllOrders: () => {
       dispatch(fetchAllOrders());
     }
   }
  }
  
export default connect(mapState, mapDispatch)(OrderHistory);