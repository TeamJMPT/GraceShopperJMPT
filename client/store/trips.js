import axios from 'axios';

//ACTION TYPES
const GET_ALL_TRIPS = 'GET_ALL_TRIPS';
const GET_SINGLE_TRIP = 'GET_SINGLE_TRIP';
const FILTERED_TRIPS = 'FILTERED_TRIPS';



//ACTION CREATORS
export function getAllTrips(trips) {
  return {type: GET_ALL_TRIPS, trips}
}

export function getSingleTrip(selectedTrip) {
  return {type: GET_SINGLE_TRIP, selectedTrip}
}

export function filterTrips(categoryId) {
  console.log("IN filterTrip action creator!")
  return {type: FILTERED_TRIPS, categoryId}
}

//THUNKS
export const fetchAllTrips = () => {
  return dispatch => {
    axios.get('/api/trips')
      .then(res => res.data)
      .then(trips => {
        console.log('Got the trips from the db!', trips.map(trip => trip.categories.map(category => category.name)));
        dispatch(getAllTrips(trips))
      })
      .catch(console.error);
  }
}

export const fetchSingleTrip = (id) => {
  return dispatch => {
    axios.get(`/api/trips/${id}`)
      .then(res => res.data)
      .then(trip => {
        dispatch(getSingleTrip(trip))
      })
      .catch(console.error)
  }
}

export const createNewTrip = (newTrip, history) => {
  return dispatch => {
    return axios.post('/api/trips', newTrip)
      .then(res => {
        console.log("RES.DATA:", res.data)
        return res.data
      })
      .then(newTrip => {
        dispatch(getSingleTrip(newTrip))
        history.push(`/trips/${newTrip.id}`)
      })
  }
}

//REDUCER(S)
export function tripReducer(trips = [], action) {
  switch (action.type) {
    case GET_ALL_TRIPS:
      trips = action.trips
      return trips
    case FILTERED_TRIPS: {
      trips = (trips.filter(trip => {
        return trip.categories.some((category) => {
          return category.id === action.categoryId
        })
      }))
      console.log("FILTERED TRIPS!", trips)
      return trips
    }
    default:
    // console.log('returning default in tripReducer')
      return trips
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
