import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSingleTrip } from '../store/trips';

class SingleTrip extends Component {
    componentDidMount(){
        this.props.getSingleTrip(this.props.match.params.id);
      }

    render() {
        let trip = this.props.selectedTrip
        console.log("rendering single trip", this.props)
        return (
          <div>
            <img src={trip.imageUrl} />
            <h1>{trip.name}</h1>
            <h2>Location: {trip.location}</h2>
            <h2>Price: {trip.price}</h2>
            <button>BOOK NOW</button>
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
