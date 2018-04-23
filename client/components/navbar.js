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
        <div className="nav-item">
          <Link className='nav-btn' to="/trips">Quests</Link> {/* repeated below so DRY out your code -- KHLW*/}
          <Link className='nav-btn' to="/cart"><img id="cart-img" alt="logo" src="/images/luggage.png" /></Link>
      {isLoggedIn ? (
          {/* The navbar will show these links after you log in */}
          {isAdmin && <Link className='nav-btn' to="/add">Add</Link>}
          <a className='nav-btn' href="#" onClick={handleClick}>
            Logout
            </a>
      ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <div className="container-1">
               <input className="search" type="search" id="search"  placeholder="Search..." /> {/* remove me -- KHLW*/}
                <Link className='nav-btn' to="/trips">Quests</Link>
                <Link className='nav-btn' to="/login">Login</Link>
                <Link  className='nav-btn' to="/signup">Sign Up</Link>
                <Link className='nav-btn' to="/cart"><img id="cart-img" alt="logo" src="/images/luggage.png" /></Link>
            </div>

          </div>
        )}
        </div>
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
