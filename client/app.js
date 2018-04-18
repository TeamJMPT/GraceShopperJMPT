import React from 'react'

import {Navbar, Trips} from './components'
import Routes from './routes'
import SingleTrip from './components/singleTrip';
import Sidebar from './components/sidebar';


const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <Sidebar />
    </div>
  )
}
//will integrate our navbar and sidebar

export default App
