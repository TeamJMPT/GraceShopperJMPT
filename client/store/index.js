import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import {tripReducer, singleTripReducer, searchReducer} from './trips';
import categoriesReducer from './categories';
import { cartReducer } from './cart';
import {checkoutReducer} from './checkout';

const reducer = combineReducers({user, trips: tripReducer, selectedTrip: singleTripReducer, categories: categoriesReducer, cart: cartReducer, search: searchReducer})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
