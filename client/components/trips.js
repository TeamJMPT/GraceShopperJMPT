import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllTrips } from '../store/trips';

class Trips extends Component {

  componentDidMount(){
    this.props.getAllTrips();
  }

  render() {
    console.log("GOT TRIPS IN COMPONENT", this.props.trips.name)
    console.log("console logging props", this.props)
    return (
      <div>{this.props.trips.map(trip => {
        return <div key={trip.id}>{trip.name}</div>
      })}</div>
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
