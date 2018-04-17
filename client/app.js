import React from 'react'

import {Navbar, Trips} from './components'
import Routes from './routes'
import SingleTrip from './components/singleTrip';


const App = () => {
  return (
    <div>
      <Navbar />
      <Trips />
      <SingleTrip />
      <Routes />
    </div>
  )
}
//will integrate our navbar and sidebar

export default App
