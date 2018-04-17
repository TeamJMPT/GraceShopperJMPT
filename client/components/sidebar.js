import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchAllCategories } from '../store/categories';

class Sidebar extends Component {

  componentDidMount() {
    this.props.getAllCategories();
  }

  render() {
    console.log('HERE ARE categories!', this.props.categories)
        return (
          <section className="sidebar">
            <div className="sidebar-header">
          <h3 href="#">
            <div>QUEST</div>
            <i alt="Brand" className="glyphicon glyphicon-comment">
            </i>
          </h3 >
        </div >
          <h5>Categories:</h5>
      </section>
    )
  }
}

const mapState = state => {
  return {
    categories: state.categories
  }
}

const mapDispatch = dispatch => {
  return {
    getAllCategories: () => {
      dispatch(fetchAllCategories());
    }
    // handleClick: (evt) => {
    //   evt.preventDefault();
    //   dispatch(setSelectedTrips());
    }
}

export default connect(mapState, mapDispatch)(Sidebar)

