import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateTrip } from '../store/trips'

class EditTrip extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      location: '',
      imageURL: '',
      price: '',
      description: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit(e) {
    const { selectedTrip } = this.props
    e.preventDefault();
    const updatedTrip = {
      name: this.state.name || selectedTrip.name,
      location: this.state.location || selectedTrip.location,
      imageURL: this.state.imageURL || selectedTrip.imageUrl,
      price: +this.state.price || selectedTrip.price,
      description: this.state.description || selectedTrip.description,
      id: selectedTrip.id
    }
    this.props.updateTrip(updatedTrip)
    this.setState({
      name: '',
      location: '',
      imageURL: '',
      price: '',
      description: ''
    })
  }

  render() {
    const { selectedTrip } = this.props;
    { console.log("SELECTEDTRIP IN EDIT FORM", this.props.selectedTrip) }
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <h2>Edit This Trip</h2>
          <label>Name</label>
          <input
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
            name="name"
            placeholder="update name"
          />
          <label>location</label>
          <input
            type="text"
            value={this.state.location}
            onChange={this.handleChange}
            name="location"
            placeholder="update location"
          />
          <label>imageURL</label>
          <input
            type="text"
            value={this.state.imageURL}
            onChange={this.handleChange}
            name="imageURL"
            placeholder={`currently ${selectedTrip.imageUrl}`}
          />
          <label>Price</label>
          <input
            type="number"
            value={this.state.price}
            onChange={this.handleChange}
            name="price"
            placeholder="update price"
          />
          <label>Description</label>
          <input
            type="text"
            value={this.state.description}
            onChange={this.handleChange}
            name="description"
            placeholder="update description"
          />
        </div>
        <div>
          <button type="submit">Update Trip</button>
        </div>
      </form>
    );

  }

}


const mapState = (state) => {
    return {
        selectedTrip: state.selectedTrip
    }
}

// const mapDispatch = (dispatch, ownProps) => {
//     return {
//         handleSubmit(e) {
//             e.preventDefault();
//             const newTrip = {
//                 name : this.state.name,
//                 location : this.state.location,
//                 imageURL : this.state.imageURL,
//                 price : +this.state.price,
//                 description : this.state.description
//             }
//             dispatch(createNewTrip(newTrip, ownProps.history))
//             this.setState({
//                 name : '',
//                 location : '',
//                 imageURL : '',
//                 price : '',
//                 description : ''
//             })
//         }
//     }
// }

export default connect(mapState, { updateTrip })(EditTrip);
