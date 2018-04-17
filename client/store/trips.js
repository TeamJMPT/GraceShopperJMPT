import axios from 'axios';

//ACTION TYPES
const GET_ALL_TRIPS = 'GET_ALL_TRIPS';
const GET_SINGLE_TRIP = 'GET_SINGLE_TRIP';
// const SET_SELECTED_TRIPS = 'SET_SELECTED_TRIPS';



//ACTION CREATORS
export function getAllTrips(trips) {
  return {type: GET_ALL_TRIPS, trips}
}

export function getSingleTrip(selectedTrip) {
  return {type: GET_SINGLE_TRIP, selectedTrip}
}

// export function setSelectedTrips(categoryId) {
//   return {type: SET_SELECTED_TRIPS, selectedTrips}
// }

//THUNKS
export const fetchAllTrips = () => {
  return dispatch => {
    axios.get('/api/trips')
      .then(res => res.data)
      .then(trips => {
        // console.log('Got the trips from the db!', trips.map(trip => trip.categories.map(category => category.name)));
        dispatch(getAllTrips(trips))
      })
      .catch(console.error);
  }
}

export const fetchSingleTrip = () => {
  return dispatch => {
    axios.get('/api/trips/:id')
      .then(res => res.data)
      .then(trip => {
        dispatch(getSingleTrip(trip))
      })
      .catch(console.error)
  }
}

//REDUCER(S)
export function tripReducer(state = [], action) {
  switch (action.type) {
    case GET_ALL_TRIPS:
      return action.trips
    // case SET_SELECTED_TRIPS:
    //   return action.selectedTrips
    default:
      return state
  }
}

export function singleTripReducer(state = {}, action) {
  switch (action.type) {
    case GET_SINGLE_TRIP:
      return action.selectedTrip
    default:
      return state
  }
}
