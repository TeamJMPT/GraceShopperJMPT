import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSingleTrip } from '../store/trips';
import axios from 'axios';

class SingleTrip extends Component {
    constructor() {
      super();
      this.state = {
        quantity: ''
      }
      this.handleSubmit = this.handleSubmit.bind(this)
      this.handleChange = this.handleChange.bind(this)
    }


    componentDidMount(){
        this.props.getSingleTrip(this.props.match.params.id);
    }

    postOrder(newOrder) {
      axios.post('/api/orders/:orderId', newOrder)
      .then(res => {
        console.log("RES.DATA:", res.data)
        return res.data
      })
      .then(newOrder => 
        console.log("New Order Placed! Order: ", newOrder))
    }

    handleChange(e) {
      this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit(e) {
      e.preventDefault();
      let trip = this.props.selectedTrip
      const newOrder = {
        quantity: +this.state.quantity,
        price: trip.price
      }
      this.postOrder(newOrder)
      this.setState({
        quantity: ''
      })
    }

    render() {
        let trip = this.props.selectedTrip
        console.log("rendering single trip", trip)
        return (
          <div>
            <img src={trip.imageUrl} />
            <h1>{trip.name}</h1>
            <h2>Location: {trip.location}</h2>
            <h2>Price: {trip.price}</h2>
            <p>Description: {trip.description}</p>
            <form onSubmit={this.handleSubmit}>
              <label>Quantity</label>
              <input type='number' 
                    name='quantity'
                    value={this.state.quantity} 
                    placeholder='0' 
                    onChange={this.handleChange} />
              <button>BOOK NOW</button>
            </form>
            <button>Edit</button>
          </div>
        )
      }
    }

    const mapState = state => {
      return {
        selectedTrip: state.selectedTrip
      }
    }

    const mapDispatch = dispatch => {
     return {
       getSingleTrip: (id) => {
         dispatch(fetchSingleTrip(id));
       }
     }
    }

    export default connect(mapState, mapDispatch)(SingleTrip)
