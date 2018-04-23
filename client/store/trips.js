import axios from 'axios';

//ACTION TYPES
const GET_ALL_TRIPS = 'GET_ALL_TRIPS';
const GET_SINGLE_TRIP = 'GET_SINGLE_TRIP';
const FILTERED_TRIPS = 'FILTERED_TRIPS';
const ADD_TRIP = 'ADD_TRIP';
const ADD_UPDATED_TRIP = 'ADD_UPDATED_TRIP';
const SEARCH = 'SEARCH';



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

export function addTrip(newTrip) {
  return {type: ADD_TRIP, newTrip}
}

export function addUpdatedTrip(updatedTrip) {
  return {type: ADD_UPDATED_TRIP, updatedTrip}
}


export function search(searchInput) {
  return {type: SEARCH, searchInput};
}

//THUNKS
export const fetchAllTrips = () => {
  return dispatch => {
    axios.get('/api/trips')
      .then(res => res.data)
      .then(trips => {
        trips.map(trip => trip.categories.map(category => category.name))
        return dispatch(getAllTrips(trips))
      })
      .catch(console.error); // just note that eventually you as a developer want to show this to the user. Redirect to an error page. Show a message that has a timeout (alert, error store). Show message (error store) and it goes away when the componentUnmount dispatch(clearErrors()) -- KHLW
  }
}

export const fetchSingleTrip = (id) => {
  return dispatch => {
    axios.get(`/api/trips/${id}`) // sometimes you return axios and sometimes you aren't -- KHLW
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
        console.log("Getting res.data", res.data)
        return res.data
      })
      .then(trip => {
        dispatch(addTrip(trip))
        history.push(`/trips/${trip.id}`)
      })
  }
}

export const updateTrip = (updatedTrip, history) => {
  return dispatch => {
    return axios.put(`/api/trips/${updatedTrip.id}`, updatedTrip)
      .then(res => {
        console.log("Getting updated trip back", res.data)
        return res.data
      })
      .then(updated => {
        dispatch(addUpdatedTrip(updated))
        history.push(`/trips/${updated.id}`)
      })
  }
}

// export const postNewItem = (newItem) => {
//   return dispatch => {
//      axios.post(`/api/cart/${newItem.userId}`, newItem)
//     .then(res => {
//       console.log("RES.DATA:", res.data)
//       return res.data
//     })
//     .then(order => dispatch(addToCart(order)));
//   }
// }

//REDUCER(S)

export function searchReducer(searchInput = '', action) {
  switch (action.type) { // not sure if this needs to be in store or if local state of the component might be enough -- KHLW
    case SEARCH: {
      // value = action.value
      // const works = value.contents.filter((val) => val.includes(value));
      // return {...value, value, works};
      return action.searchInput
    }
    default:
      return searchInput;
  }
}


export function tripReducer(trips = [], action) {
  switch (action.type) {
    case GET_ALL_TRIPS:
      trips = action.trips // 1 line -- KHLW
      return trips
    case ADD_TRIP:
      return [...trips, action.newTrip]
    case ADD_UPDATED_TRIP:
    // if you just updated a trip you need to remove the updated on and then spread. Or use a map
      // trips.map(t => t.id === action.updatedTrip.id ? action.updatedTrip : t)
      return [...trips, action.updatedTrip]
    default:
      return trips
  }
}

export function singleTripReducer(state = {}, action) {
  switch (action.type) {
    case GET_SINGLE_TRIP:
      return action.selectedTrip
      //Why doesn't this do what I want???!!??
    // case ADD_UPDATED_TRIP:
    //   return action.updatedTrip
    default:
      return state
  }
}

