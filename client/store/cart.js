import axios from 'axios';

const initialState = []

const ADD_TO_CART = 'ADD_TO_CART'
const GET_ALL_FROM_CART = 'GET_ALL_FROM_CART'


export function getAllFromCart(orders) {
    return {type: GET_ALL_FROM_CART, orders}
}

// export function addToCart(order) {
//     return {type: ADD_TO_CART, order}
// }

export const fetchAllFromCart = () => {
    return dispatch => {
      axios.get('/api/orders')
        .then(res => res.data)
        .then(orders => {
          dispatch(getAllFromCart(orders))
        })
        .catch(console.error);
    }
}

//REDUCER(S)
export function cartReducer(orders = [], action) {
  switch (action.type) {
    case GET_ALL_FROM_CART:
      orders = action.orders
      return orders
    default:
      return orders
  }
}