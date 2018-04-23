import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => (
  <div className="nav-panel">
    <div className="logo">
    <Link to="/"><img alt="logo" src="/images/compass.png" /></Link>
    </div>
    <nav>
      {isLoggedIn ? (
        <div className="nav-item">
          {/* The navbar will show these links after you log in */}
          {isAdmin && <Link className='nav-btn' to="/add">Add</Link>}
          <Link className='nav-btn' to="/trips">Quests</Link>
          <Link className='nav-btn' to="/cart"><img id="cart-img" alt="logo" src="/images/luggage.png" /></Link>
          <a className='nav-btn' href="#" onClick={handleClick}>
            Logout
            </a>
        </div>
      ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <div className="container-1">
               <input className="search" type="search" id="search"  placeholder="Search..." />
                <Link className='nav-btn' to="/trips">Quests</Link>
                <Link className='nav-btn' to="/login">Login</Link>
                <Link  className='nav-btn' to="/signup">Sign Up</Link>
                <Link className='nav-btn' to="/cart"><img id="cart-img" alt="logo" src="/images/luggage.png" /></Link>
            </div>

          </div>
        )}
    </nav>
    {/* <hr /> */}
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.isAdmin
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
