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
                        <img className="main-img" src="/images/photo-1494137319847-a9592a0e73ed.jpeg"  />
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
            <hr />
            <section className="row">
                <h2>Featured Quests</h2>
                {props.trips.length &&
                    <div>
                        <div>
                            <img src={props.trips[0].imageUrl} />
                            <h3>{props.trips[0].location}</h3>
                            <h4>${props.trips[0].price}</h4>
                        </div>
                        <div>
                            <img src={props.trips[1].imageUrl} />
                            <h3>{props.trips[1].location}</h3>
                            <h4>${props.trips[1].price}</h4>
                        </div>
                        <div>
                            <img src={props.trips[2].imageUrl} />
                            <h3>{props.trips[2].location}</h3>
                            <h4>${props.trips[2].price}</h4>
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
