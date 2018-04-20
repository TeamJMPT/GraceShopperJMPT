import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchAllTrips } from '../store/trips'

const Home = (props) => {
    console.log("homepage props: ", props); //empty array
    return (
        <div>
            <section>
                <img className="main-img"src="https://i.imgur.com/mxeb2NK.png" width="50%" height="50%" align="center" />
                <p align="center">Welcome protagonists!</p>
                <p align="center">Choose your quest!</p>
                <p align="center">North or south,</p>
                <p align="center">east or west.</p>
                <p align="center">Go on an adventure.</p>
                <p align="center">Make new friends.</p>
                <p align="center">You'll wish this</p>
                <p align="center">journey never ends.</p>
            </section>
            <hr />
            <section>
                <h2>Featured Quests</h2>
                {props.trips.length &&
                    <div>
                        <div>
                            <img src={props.trips[0].imageUrl} />
                            <h3>{props.trips[0].name}</h3>
                            <h4>{props.trips[0].price}</h4>
                        </div>
                        <div>
                            <img src={props.trips[1].imageUrl} />
                            <h3>{props.trips[1].name}</h3>
                            <h4>{props.trips[1].price}</h4>
                        </div>
                        <div>
                            <img src={props.trips[2].imageUrl} />
                            <h3>{props.trips[2].name}</h3>
                            <h4>{props.trips[2].price}</h4>
                        </div>
                    </div>
                }
            </section>
        </div>
    )
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

// Home.propTypes = {
//     trips: React.PropTypes.array.isRequired
// }

  export default connect(mapState, mapDispatch)(Home)
