import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchAllCategories } from '../store/categories';
import { filterTrips } from '../store/trips';

class Sidebar extends Component {

  componentDidMount() {
    this.props.getAllCategories();
  }

  render() {
    const categories = this.props.categories
    console.log('HERE ARE categories!', this.props.categories)
        return (
          // <div className="sidenav">
            <section className="sidebar">
              <div className="sidebar-header">
            <h3 href="#">
              <div>QUEST</div>
              <i alt="Brand" className="glyphicon glyphicon-comment">
              </i>
            </h3 >
          </div >
            <h5>Categories:</h5>
            {
              categories.map(category => {
                return (
                    <Link to={`/trips/category/${category.id}`} key={category.id}>
                <ul onClick={() => {
                  // console.log("CATEGORY ID IN onCLICK", category.id)
                  this.props.handleSubmit(category.id)
                }
              }>{category.name}</ul>
                </Link>
                )
              })
            }
        </section>
        // </div>
    )
  }
}

const mapState = (state) => {
  return {
    categories: state.categories
  }
}

const mapDispatch = (dispatch) => {
  return {
    getAllCategories: () => {
      dispatch(fetchAllCategories());
    },
    handleSubmit: (id) => {
      // evt.preventDefault();
      dispatch(filterTrips(id));
    }
  }
}

export default connect(mapState, mapDispatch)(Sidebar)
