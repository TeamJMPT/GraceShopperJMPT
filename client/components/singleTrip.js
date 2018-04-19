import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchSingleTrip } from '../store/trips';
import EditTrip from './editTrip';

class SingleTrip extends Component {
    componentDidMount(){
        this.props.getSingleTrip(this.props.match.params.id);
      }

    render() {
      {console.log("isAdmin in single trip", this.props.isAdmin)}
        let trip = this.props.selectedTrip
        console.log("rendering single trip", trip)
        return (
          <div>
            <img src={trip.imageUrl} />
            <h1>{trip.name}</h1>
            <h2>Location: {trip.location}</h2>
            <h2>Price: {trip.price}</h2>
            <p>Description: {trip.description}</p>
            <button>BOOK NOW</button>
            {this.props.isAdmin && <EditTrip />}
          </div>
        )
      }
    }

    const mapState = state => {
      return {
        selectedTrip: state.selectedTrip,
        isAdmin: state.user.isAdmin
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
