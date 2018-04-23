import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllTrips, search } from '../store/trips';
import Sidebar from './sidebar';


function searchingFor(search){
  return function(x){
    return x.name.toLowerCase().includes(search.toLowerCase() || !search)
  }
}

class Trips extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      isDirty: false
    };

    this.searchHandler = this.searchHandler.bind(this);
  }

  searchHandler(e){
    this.setState({
      search: e.target.value,
    })
  }

  componentDidMount(){
    this.props.getAllTrips();
  }

  trips(){
    const { where = () => true } = this.props
    return this.props.trips.filter(where)
  }

  render() {
    console.log("trips now in trip component", this.props.trips)
    let searchLength = this.state.search.length;

    let isDirty = searchLength ? true : false;

    return (
      <div className="container">
        <Sidebar />
        <div className="wrap">
        <form onSubmit={this.handleSubmit}>
          <span className="icon"><i className="fa fa-search"></i></span>
          <input className="search" type="search" id="search" placeholder="Search..." value={this.state.search} onChange={this.searchHandler}/>
         </form> 
        
        {isDirty ? <div className="wrap">
        {  this.trips().filter(searchingFor(this.state.search)).length ? 
          (this.trips().filter(searchingFor(this.state.search)).map(trip => {
            return (
              <div className="trips"  key={trip.id}>
                <img className="trips-images"src={trip.imageUrl} />
                <Link to={`/trips/${trip.id}`} className='trips'><h3>{trip.name}</h3></Link>
                <h5>{trip.location}</h5>
                <h5>{`$${trip.price}`}</h5>
              </div>
            )
          })) :<p>No Match</p>
        }
        </div> : <div className="wrap">
        {
          this.trips().map(trip => {
            return (
              <div className="trips"  key={trip.id}>
                <img className="trips-images"src={trip.imageUrl} />
                <Link to={`/trips/${trip.id}`} className='trips'><h3>{trip.name}</h3></Link>
                <h5>{trip.location}</h5>
                <h5>{`$${trip.price}`}</h5>
              </div>
            )
          })
        }
        </div> }
        
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