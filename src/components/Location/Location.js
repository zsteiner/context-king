import React, { Component } from 'react';
import PropTypes from 'prop-types';

import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';
import getBackground from '../../utils/getBackground';

import { LocationContext } from '../../contexts/LocationContext';

import Input from '../Input/Input';
import LocationButton from '../LocationButton/LocationButton';
import LocationResults from '../LocationResults/LocationResults';

import styles from './Location.module.scss';

const apiKeyMapbox =
  'pk.eyJ1IjoienN0ZWluZXIiLCJhIjoiTXR4U0tyayJ9.6BxBAjPyMHbt1YfD5HWGXA';
const geocodingClient = mbxGeocoding({ accessToken: apiKeyMapbox });

class Location extends Component {
  constructor(props, context) {
    super(props);

    this.state = {
      coordinates: [],
      locationName: context.locationName,
      enteredLocation: context.locationName,
      results: [],
      resultsVisible: false
    };
  }

  static contextType = LocationContext;

  static propTypes = {
    coordinates: PropTypes.array,
    getLocation: PropTypes.func
  };

  reverseLookup = (lat, lon) => {
    this.context.setLoading();
    geocodingClient
      .reverseGeocode({
        query: [lon, lat],
        limit: 2,
        types: ['place']
      })
      .send()
      .then(response => {
        const location = response.body.features[0];
        const name = location.text;
        const state = location.context[0].text;
        const coordinates = [lon, lat];

        this.context.setLocation(location, coordinates);
        getBackground(`${state} ${name}`);

        this.setState({
          location: location,
          locationName: `${name}, ${state}`,
          enteredLocation: `${name}, ${state}`
        });
      });
  };

  getLocation = () => {
    this.context.setLoading();

    navigator.geolocation.getCurrentPosition(
      position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        this.reverseLookup(lat, lon);
        this.context.getForecast(lon, lat);

        this.setState({
          coordinates: [lon, lat]
        });
      },
      error => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  updateLocation = event => {
    this.context.setLoading();
    event.preventDefault();

    geocodingClient
      .forwardGeocode({
        query: this.state.enteredLocation,
        types: ['place']
      })
      .send()
      .then(response => {
        const location = response.body.features[0];
        const name = location.text;
        const state = location.context[0].text;
        const coordinates = location.center;

        getBackground(`${state} ${name}`);
        this.context.setLocation(location, coordinates);
        this.context.getForecast(coordinates[0], coordinates[1]);

        this.setState({
          location: location,
          locationName: `${name}, ${state}`
        });
      });
  };

  updateLocationName = event => {
    this.setState({
      enteredLocation: event.target.value
    });
  };

  handleChange = event => {
    this.setState({ enteredLocation: event.target.value });
    this.updateLocationName(event);
  };

  componentDidMount() {
    this.getLocation();
  }

  render() {
    const state = this.state;
    return (
      <LocationContext.Consumer>
        {context => (
          <section className={styles.location}>
            <div className={styles.row}>
              <Input
                placeholder="Enter Location"
                onSubmit={this.updateLocation}
                value={this.state.enteredLocation}
                onChange={this.handleChange}
              />
              {this.state.resultsVisible ? (
                <LocationResults results={this.state.results} />
              ) : null}
              <LocationButton onClick={this.getLocation} />
            </div>

            <h1 className={styles.locationName}>{state.locationName}</h1>
            <small>
              {context.coordinates
                ? `${context.coordinates[0]}, ${context.coordinates[1]}`
                : null}
            </small>
          </section>
        )}
      </LocationContext.Consumer>
    );
  }
}

export default Location;
