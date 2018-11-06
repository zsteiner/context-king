import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CoordinateContext } from '../../contexts/CoordinateContext';

import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';

const apiKeyMapbox =
  'pk.eyJ1IjoienN0ZWluZXIiLCJhIjoiTXR4U0tyayJ9.6BxBAjPyMHbt1YfD5HWGXA';
const geocodingClient = mbxGeocoding({ accessToken: apiKeyMapbox });

class Location extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: 'Denver'
    };
  }

  static contextType = CoordinateContext;

  static propTypes = {
    getLocation: PropTypes.func
  };

  updateLocation = event => {
    event.preventDefault();

    geocodingClient
      .forwardGeocode({
        query: this.state.location
      })
      .send()
      .then(response => {
        this.setState({
          coordinates: response.body.features[0].center,
          fetchingLocation: false
        });
      });
  };

  handleChange = event => {
    this.setState({ location: event.target.value });
  };

  render() {
    return (
      <section>
        <CoordinateContext.Consumer>
          <form onSubmit={this.updateLocation}>
            <input
              placeholder="Enter Location"
              value={this.state.location}
              onChange={this.handleChange}
            />
          </form>
        </CoordinateContext.Consumer>
        <button onClick={this.props.getLocation}>use current location</button>
      </section>
    );
  }
}

export default Location;
