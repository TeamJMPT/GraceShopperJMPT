import axios from 'axios';

const initialState = []

//ACTION TYPES
const ADD_TO_CART = 'ADD_TO_CART';
const GET_ALL_FROM_CART = 'GET_ALL_FROM_CART';

//ACTION CREATORS
export function getAllFromCart(orders) {
    return {type: GET_ALL_FROM_CART, orders}
}

export function addToCart(newItem) {
    return {type: ADD_TO_CART, newItem}
}

//THUNKS
export const fetchAllFromCart = (userId) => {
    return dispatch => {
      axios.get(`/api/orders/${userId}`)
        .then(res => {
          console.log('Coming back with the data!', res.data)
          return res.data}
        )
        .then(orders => {
          dispatch(getAllFromCart(orders))
        })
        .catch(console.error);
    }
}

export const postNewItem = (newItem) => {
    return dispatch => {
       axios.post(`/api/orders/${newItem.userId}`, newItem)
      .then(res => {
        console.log("RES.DATA:", res.data)
        return res.data
      })
      .then(order => dispatch(addToCart(order)));
    }
}

//REDUCER(S)
export function cartReducer(orders = [], action) {
  switch (action.type) {
    case GET_ALL_FROM_CART:
      orders = action.orders
      return orders
    case ADD_TO_CART:
      return [...orders, action.newItem]
    default:
      return orders
  }
}
