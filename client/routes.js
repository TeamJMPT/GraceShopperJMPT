import React, {Component} from 'react'
import {connect} from 'react-redux'
import { withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome} from './components'
import Trips from './components/trips'
import {me} from './store'

import { fetchAllTrips } from './store/trips'
import SingleTrip from './components/singleTrip';
import Home from './components/home';
import AddNewTrip from './components/addNewTrip';
import EditTrip from './components/editTrip';
import Cart from './components/cart';
import OrderHistory from './components/orderHistory';
import Checkout from './components/checkout';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData()
  }

  render () {
    const {isLoggedIn} = this.props

    return (
      <Switch>

        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/trips" component={Trips} />
        <Route exact path= "/trips/:id" component={SingleTrip} />
        <Route exact path="/cart" component={Cart} />
        <Route path="/checkout" component={Checkout} />
        <Route
          path="/trips/category/:id" render={({ match }) => {
          return (<Trips where={trip => {
            return trip.categories.some((category) => {
              return category.id == match.params.id
            })
          }} />)
        }} />
        <Route exact path="/add" component={AddNewTrip} />
        <Route exact path="/edit" component={EditTrip} />
        {
          isLoggedIn &&
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route path="/home" component={UserHome} />
              <Route path="/orders" component={OrderHistory} />
            </Switch>
        }
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(fetchAllTrips());
      dispatch(me());
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
