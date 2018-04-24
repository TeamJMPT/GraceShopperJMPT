import axios from 'axios';

//ACTION TYPES
const GET_ORDERS = 'GET_ORDERS';

//ACTION CREATORS
export function getAllOrders(orders) {
    return {type: GET_ORDERS, orders}
}

//THUNK
export const fetchAllOrders = (userId) => {
  return dispatch => {
    axios.get(`/api/orders/user/${userId}`)
      .then(res => {
        console.log("Getting order", res.data)
        return res.data
      })
      .then(orders => {
        dispatch(getAllOrders(orders))
      })
      .catch(console.error);
  }
}

export default function(orders = [], action) {
    switch (action.type) {
      case GET_ORDERS:
         orders =  action.orders
         return orders;
      default:
        return orders
    }
}
  
