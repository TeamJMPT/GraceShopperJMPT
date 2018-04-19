import React from 'react'

import {Navbar, Trips} from './components'
import Routes from './routes'
import SingleTrip from './components/singleTrip';
import Sidebar from './components/sidebar';
import addNewTrip from './components/addNewTrip';


const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      {/* <Sidebar /> */}
    </div>
  )
}
//will integrate our navbar and sidebar

export default App
