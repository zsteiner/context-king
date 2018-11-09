import React, { Component } from 'react';

import jsonp from 'jsonp';
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';

import Loading from './components/Loading/Loading';
import Location from './components/Location/Location';
import Forecast from './components/Forecast/Forecast';

import { LocationContext } from './contexts/LocationContext';

import styles from './styles/App.module.scss';
import getBackground from './utils/getBackground';

const apiKeyMapbox =
  'pk.eyJ1IjoienN0ZWluZXIiLCJhIjoiTXR4U0tyayJ9.6BxBAjPyMHbt1YfD5HWGXA';
const geocodingClient = mbxGeocoding({ accessToken: apiKeyMapbox });
const mockForecast = require('./mockData/mockForecast.json');
const apiDarkskyToken = '16eb53a912c674ef3028c1c421473d5e';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coordinates: [],
      fetchingForecast: true,
      forecast: mockForecast,
      getLocation: this.getLocation,
      location: {},
      locationName: 'Denver',
      enteredLocation: '',
      updateLocation: this.updateLocation,
      updateLocationName: this.updateLocationName
    };
  }

  componentDidMount() {
    this.getLocation();
  }

  setLoading = () => {
    this.setState({
      fetchingForecast: true
    });
  };

  getForecast = (lat, lon) => {
    const api = `https://api.darksky.net/forecast/${apiDarkskyToken}/${lat},${lon}?exclude=minutely,hourly`;

    this.setLoading();

    jsonp(api, null, (error, response) => {
      if (error) {
        console.error(error.message);
      } else {
        this.setState({
          forecast: response,
          fetchingForecast: false
        });
      }
    });
  };

  reverseLookup = (lat, lon) => {
    this.setLoading();
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

        getBackground(location.context[0].text);

        this.setState({
          location: location,
          locationName: `${name}, ${state}`,
          enteredLocation: name
        });
      });
  };

  getLocation = () => {
    this.setLoading();

    navigator.geolocation.getCurrentPosition(
      position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        this.reverseLookup(lat, lon);
        this.getForecast(lat, lon);

        this.setState({
          coordinates: [lat, lon]
        });
      },
      error => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  updateLocation = event => {
    this.setLoading();
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

        this.setState({
          coordinates: location.center,
          location: location,
          locationName: `${name}, ${state}`
        });

        const coordinates = this.state.coordinates;

        getBackground(location.context[0].text);
        this.getForecast(coordinates[1], coordinates[0]);
      });
  };

  updateLocationName = event => {
    this.setState({
      enteredLocation: event.target.value
    });
  };

  render() {
    const state = this.state;

    return (
      <article className={styles.app}>
        <LocationContext.Provider value={this.state}>
          <Location />
          {state.fetchingForecast ? <Loading /> : <Forecast />}
        </LocationContext.Provider>
      </article>
    );
  }
}

export default App;
