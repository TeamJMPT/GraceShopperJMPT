import axios from 'axios';

//ACTION TYPES
const SET_ALL_CATEGORIES = 'SET_ALL_CATEGORIES'



//ACTION CREATORS
export function setAllCategories(categories) {
  return { type: SET_ALL_CATEGORIES, categories}
}

//THUNKS
export const fetchAllCategories = () => {
  return dispatch => {
    axios.get('/api/categories')
      .then(res => res.data)
      .then(categories => {
        // console.log('Got the trips from the db!', trips.map(trip => trip.categories.map(category => category.name)));
        dispatch(setAllCategories(categories))
      })
      .catch(console.error);
  }
}

//REDUCER(S)
export default function categoriesReducer(state = [], action) {
  switch (action.type) {
    case SET_ALL_CATEGORIES:
      return action.categories
    default:
      return state
  }
}
