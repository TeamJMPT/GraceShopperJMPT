import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => (
  <div>
      {console.log("isAdmin?!", isAdmin)}
    <Link to="/"><h1>QUEST</h1></Link>
    <div className="logo">
    <Link to="/"><img alt="logo" src="/images/compass.png" /></Link>
    </div>

    <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <span className="icon"><i className="fa fa-search"></i></span>
            <input className="search" type="search" id="search" placeholder="Search..." />
            {isAdmin && <Link to="/add">Add</Link>}
            <Link to="/trips">Quests</Link>
            <Link to="/cart"><img alt="logo" src="/images/luggage.png" /></Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <div className="container-1">
               <span className="icon"><i className="fa fa-search"></i></span>
               <input className="search" type="search" id="search" placeholder="Search..." />
                <Link to="/trips">Quests</Link>
                <Link to="/cart"><img alt="logo" src="/images/luggage.png" /></Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
            </div>

          </div>
        )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
}
