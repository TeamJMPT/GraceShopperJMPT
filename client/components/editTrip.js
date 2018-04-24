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
    this.props.updateTrip(updatedTrip, this.props.history)
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
    { console.log("props?", this.props) }
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

export default connect(mapState, { updateTrip })(EditTrip);
