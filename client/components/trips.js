import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllTrips } from '../store/trips';
// import Sidebar from './sidebar';

class Trips extends Component {

  componentDidMount(){
    console.log("getAllTrips in component did mount")
    this.props.getAllTrips();
  }

  render() {
    console.log("trips now in trip component", this.props.trips)
    return (
      <div>
        {/* <Sidebar /> */}
        <div className="wrap">
        {
          this.props.trips.map(trip => {
            return (
              <div className="trips"  key={trip.id}>
                <img src={trip.imageUrl} />
                <Link to={`/trips/${trip.id}`} className='trips'><h3>{trip.name}</h3></Link>
                <h5>{trip.location}</h5>
                <h5>{`$${trip.price}`}</h5>
              </div>
            )
          })
        }
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    trips: state.trips,
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
