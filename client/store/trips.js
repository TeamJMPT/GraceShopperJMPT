import axios from 'axios';

//ACTION TYPES
const GET_ALL_TRIPS = 'GET_ALL_TRIPS';



//ACTION CREATORS
export function getAllTrips(trips) {
  return {type: GET_ALL_TRIPS, trips}
}



//THUNKS
export const fetchAllTrips = () => {
  return dispatch => {
    axios.get('/api/trips')
      .then(res => res.data)
      .then(trips => {
        // console.log('Got the trips from the db!');
        dispatch(getAllTrips(trips))
      })
      .catch(console.error);
  }
}

//REDUCER(S)
export function tripReducer(state = [], action) {
  switch (action.type) {
    case GET_ALL_TRIPS:
      return action.trips
    default:
      return state
  }
}
