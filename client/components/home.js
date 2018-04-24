import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchAllTrips } from '../store/trips'

const Home = (props) => {
    return (
        <div className="home">
            <header className="home-welcome text-center">
                <div className="home-welcome-content">
                    <div className="no-gutters">
                        <h1 className="home-welcome-title">Quest</h1>
                        <h3 className="home-welcome-message">Welcome protagonists!</h3>
                        <h3 className="home-welcome-message">Choose your quest!</h3>
                        <h3 className="home-welcome-message">North or south,</h3>
                        <h3 className="home-welcome-message">east or west.</h3>
                        <h3 className="home-welcome-message">Go on an adventure.</h3>
                        <h3 className="home-welcome-message">Make new friends.</h3>
                        <h3 className="home-welcome-message">You'll wish this</h3>
                        <h3 className="home-welcome-message">journey never ends.</h3>
                    </div>
                </div>
            </header>
            {/* <hr /> */}
            <section className="featured-quests text-center">
                <h2 className="featured-quests-title">Featured Quests</h2>
                {props.trips.length &&
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-4">
                                <img className="img-thumbnail" src={props.trips[0].imageUrl} />
                                <h3 className="featured-quest-location">{props.trips[0].location}</h3>
                                <h4 className="featured-quest-price">${props.trips[0].price}</h4>
                            </div>
                            <div className="col-sm-4">
                                <img className="img-thumbnail" src={props.trips[1].imageUrl} />
                                <h3 className="featured-quest-location">{props.trips[1].location}</h3>
                                <h4 className="featured-quest-price">${props.trips[1].price}</h4>
                            </div>
                            <div className="col-sm-4">
                                <img className="img-thumbnail" src={props.trips[2].imageUrl} />
                                <h3 className="featured-quest-location">{props.trips[2].location}</h3>
                                <h4 className="featured-quest-price">${props.trips[2].price}</h4>
                            </div>
                        </div>
                    </div>
                }
            </section>
        </div>
    )
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

export default connect(mapState, mapDispatch)(Home);
