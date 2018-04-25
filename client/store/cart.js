import axios from 'axios';

const initialState = []

//ACTION TYPES
const ADD_TO_CART = 'ADD_TO_CART';
const GET_ALL_FROM_CART = 'GET_ALL_FROM_CART';
const REFRESH_CART = 'REFRESH_CART'
const DELETE_ITEM = 'DELETE_ITEM'

//ACTION CREATORS
export function getAllFromCart(orders) {
  return {type: GET_ALL_FROM_CART, orders}
}

export function addToCart(newItem) {
  return {type: ADD_TO_CART, newItem}
}

export function refreshCart() {
  return {type: REFRESH_CART}
}

export function deleteItem(orderId) {
  return {type: DELETE_ITEM, orderId}
}

//THUNKS
export const fetchAllFromCart = (userId) => {
  return dispatch => {
    axios.get(`/api/orders/user/${userId}`)
      .then(res => {
        console.log('Coming back with the data!', res.data)
        return res.data
      }
      )
      .then(orders => {
        dispatch(getAllFromCart(orders))
      })
      .catch(console.error);
  }
}


export const postNewItem = (newItem) => {
  return dispatch => {
    console.log("NEWITEM:", newItem)
    axios.post(`/api/orders/user/${newItem.userId}`, newItem)
      .then(res => {
        console.log("RES.DATA:", res.data)
        return res.data
      })
      .then(order => dispatch(addToCart(order)));
  }
}

export const removeItem = (orderId) => {

  return dispatch => {
    axios.delete(`/api/orders/${orderId}`)
      .then(res => res.data)
      .then(dispatch(deleteItem(orderId)))
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
    case REFRESH_CART:
      return []
    case DELETE_ITEM:
     let remainingOrders = orders.filter(order => order.id !== action.orderId)
      return remainingOrders
    default:
      return orders
  }
}
