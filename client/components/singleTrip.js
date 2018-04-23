import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchSingleTrip } from '../store/trips';
import { fetchAllFromCart, postNewItem } from '../store/cart';
import EditTrip from './editTrip';

class SingleTrip extends Component {
    constructor() {
      super();
      this.state = {
        quantity: '',
      }
      // this.handleSubmit = this.handleSubmit.bind(this)
      // this.handleChange = this.handleChange.bind(this)
    }


    componentDidMount(){
        this.props.getSingleTrip(this.props.match.params.id);
        this.props.getAllFromCart(this.props.user.id);
        // this.props.getUser(this.props.match.params.user)
        // console.log(this.props.user)
    }

    handleChange = (e) => { // if you want you can do this because we are using webpack -> babel/env -- KHLW
      // check typeof e.target.value. If 'number' then quantity should be defaulted to 0. If still funny disregard / help ticket -- KHLW
      this.setState({
        quantity: e.target.value
      })
    }


    render() {
      console.log("USER!!!", this.props.user.id)
      console.log("quantity", this.state.quantity)
      const newItem = {
        quantity: +this.state.quantity,
        unitPrice: +this.props.selectedTrip.price,
        tripId: this.props.selectedTrip.id,
        userId: +this.props.user.id,
      }
      {console.log("Single Trip user", this.props.user.id)}
      // console.log("SINGLE TRIP PROPS!!", this.props )
        let trip = this.props.selectedTrip
        // console.log("rendering single trip", trip)
        return (
          <div>
            <img src={trip.imageUrl} />
            <h1>{trip.name}</h1>
            <h2>Location: {trip.location}</h2>
            <h2>Price: ${trip.price}</h2>
            <p>Description: {trip.description}</p>
            {
              trip.isAvailable ?
                (<form onSubmit={(evt) => {this.props.addToCart(newItem, evt)}}>
                  <label>Quantity</label>
                  <input type='number'
                        name='quantity'
                        value={this.state.quantity}
                        placeholder='0'
                        onChange={this.handleChange} />
                        { /* WE Love that you have form validation!! -- KHLW */
                          (this.state.quantity && this.state.quantity < 0) && <div className='alert alert-warning' style={{color:'red'}}>Please enter a valid quantity!</div>
                        }
                  <button className="add-to-cart-btn" type="submit">Add to Cart</button>
                </form>)
                :
                <span>Currently Unavailable</span>
            }
            {this.props.isAdmin &&
              <div>
                <h6>{trip.inventory} left!</h6>
                <EditTrip history={this.props.history} />
              </div>}
          </div>
        )
      }
    }

    const mapState = state => {
      return {
        selectedTrip: state.selectedTrip, // why go to the backend again? You are loading all products trips.find(t => t.id === tId) || {}. Theoretically, you wouldn't get all products from the back at the get go, so making this request would THEN make sense -- KHLW
        isAdmin: state.user.isAdmin,
        cart: state.cart,
        user: state.user
      }
    }

    const mapDispatch = dispatch => {
     return {
       getSingleTrip: (id) => {
         dispatch(fetchSingleTrip(id));
       },
       getAllFromCart: (userId) => {
         dispatch(fetchAllFromCart(userId));
       },
       addToCart: (newItem, evt) => {
         evt.preventDefault()
         dispatch(postNewItem(newItem))
       },
      //  getUser: (user) => { // delete stale code -- KHLW
      //    dispatch(getUser(user))
      //  }
     }
    }

    export default connect(mapState, mapDispatch)(SingleTrip)
