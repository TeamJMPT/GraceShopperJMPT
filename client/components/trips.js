import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllTrips } from '../store/trips';

class Trips extends Component {

  componentDidMount(){
    this.props.getAllTrips();
  }

  render() {
    return (
      <div>
      {
        this.props.trips.map(trip => {
          return (
            <div key={trip.id}>
              <img src={trip.imageUrl} />
              <Link to={`/trips/${trip.id}`} className='trips'><h3>{trip.name}</h3></Link>
              <h5>{trip.location}</h5>
              <h5>{`$${trip.price}`}</h5>
            </div>
          )
        })
      }
      </div>
    )
  }
}

const mapState = state => {
  return {
    trips: state.trips
  }
}

const mapDispatch = dispatch => {
 return {
   getAllTrips: () => {
     dispatch(fetchAllTrips());
   }
 }
}

export default connect(mapState, mapDispatch)(Trips)
