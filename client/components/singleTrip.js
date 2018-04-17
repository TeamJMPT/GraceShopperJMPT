import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSingleTrip } from '../store/trips';

class SingleTrip extends Component {
    componentDidMount(){
        this.props.getSingleTrip();
      }
    
    render() {
        console.log("rendering single trip", this.props)
        return (
          <div>
            <h1>Single Trip Page</h1>
          </div>
        )
      }
    }
    
    const mapState = state => {
      return {
        selecteTrip: state.selecteTrip
      }
    }
    
    const mapDispatch = dispatch => {
     return {
       getSingleTrip: () => {
         dispatch(fetchSingleTrip());
       }
     }
    }
    
    export default connect(mapState, mapDispatch)(SingleTrip)