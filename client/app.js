import React from 'react'

import {Navbar, Trips} from './components'
import Routes from './routes'


const App = () => {
  return (
    <div>
      <Navbar />
      <Trips />
      <Routes />
    </div>
  )
}
//will integrate our navbar and sidebar

export default App
