/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {default as Cart} from './cart'
export {default as Trips} from './trips'
export {default as AddNewTrip} from './addNewTrip'
export {default as Home} from './home'
export {default as SingleTrip} from './singleTrip'
export {Login, Signup} from './auth-form'
export {default as Checkout} from './checkout'
