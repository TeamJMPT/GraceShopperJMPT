import React, { Component } from "react";
// import { connect } from "react-redux";
import { createNewTrip } from "../store/trips"

export default class AddNewTrip extends Component {
    constructor(props) {
        super(props)
        console.log("props", props)
        this.state = {
            name : '',
            location : '',
            imageURL : '',
            price : '',
            description : ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit(e) {
        
        e.preventDefault();
        const newTrip = {
            name : this.state.name,
            location : this.state.location,
            imageURL : this.state.imageURL,
            price : +this.state.price,
            description : this.state.description
        }
        createNewTrip(newTrip)
        this.setState({
            name : '',
            location : '',
            imageURL : '',
            price : '',
            description : ''
        })
        console.log("Form is submitted!!", newTrip)
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <div>
                    <h2>Add a New Trip</h2>
                    <label>Name</label>
                    <input 
                        type="text"
                        value={this.state.name}
                        onChange={this.handleChange}
                        name="name"
                        placeholder="Enter trip name"
                    />
                    <label>location</label>
                    <input 
                        type="text"
                        value={this.state.location}
                        onChange={this.handleChange}
                        name="location"
                        placeholder="Enter location"
                    />
                    <label>imageURL</label>
                    <input 
                        type="text"
                        value={this.state.imageURL}
                        onChange={this.handleChange}
                        name="imageURL"
                        placeholder="Enter image URL"
                    />
                    <label>Price</label>
                    <input
                        type="number" 
                        value={this.state.price}
                        onChange={this.handleChange}
                        name="price"
                        placeholder="Enter trip price"
                    />
                    <label>Description</label>
                    <input 
                        type="text"
                        value={this.state.description}
                        onChange={this.handleChange}
                        name="description"
                        placeholder="Enter trip description"
                    />
                </div>
                <div>
                    <button type="submit">Create Trip</button>
                </div>
            </form>
        );

    }

}


// const mapState = state => {
//     return {
//         newTrip: this.state
//     }
// }

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

// export default connect(mapDispatch)(AddNewTrip);