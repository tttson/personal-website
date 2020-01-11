import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import axios from 'axios'
require("../../secrets")

class Location extends Component {
  constructor (props){
    super(props)
    this.state = {
      geocode: {},
      address: '',
      formattedAddress: ''
    }
  }

  handleFormChange = (event) => {
    this.setState({
    [event.target.name]: event.target.value
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    const res = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: this.state.address,
        key: process.env.GOOGLE_API_KEY
      }
    })
    this.setState({
      formattedAddress: res.data.results[0].formatted_address,
      geocode: res.data.results[0].geometry.location,
      address: ''
    })
  }



  render(){
    const mapStyles = {
      width: '50%',
      height: '50%',
    };
    return(
      <div id="container">
        <div className="all-products">
        <div>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="address">Enter your address</label>
            <input style={{width:300}} type="text" name="address" onChange={this.handleFormChange}/>
            <button type='submit' disabled={!this.state.address}>Submit</button>
          </form>
        </div>
        <Link to="/"><button className="btn-white" style={{width:250}}>GO BACK TO HOMEPAGE >></button></Link>
        {
          this.state.formattedAddress?
          <div>
            <p>Formatted address: {this.state.formattedAddress}</p>
            <Map
              google={this.props.google}
              zoom={8}
              style={mapStyles}
              initialCenter={{ lat: 40.7128, lng: -74.0060 }}
            >
            <Marker position={{lat: `${this.state.geocode.lat}`, lng: `${this.state.geocode.lng}`}} />
            </Map>
          </div>
            :
            null
        }

          </div>
        </div>
    )
  }
}


export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_API_KEY
})(Location);
