import React, { Component } from 'react';

import jsonp from 'jsonp';
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';

import Current from './components/Current/Current';

import styles from './styles/App.module.scss';

const mockForecast = require('./mockData/mockForecast.json');

const apiKeyMapbox =
  'pk.eyJ1IjoienN0ZWluZXIiLCJhIjoiTXR4U0tyayJ9.6BxBAjPyMHbt1YfD5HWGXA';
const apiToken = '16eb53a912c674ef3028c1c421473d5e';

const geocodingClient = mbxGeocoding({ accessToken: apiKeyMapbox });

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currently: {},
      daily: {},
      fetchingForecast: true,
      forecast: mockForecast,
      location: {},
      today: {}
    };
  }

  componentDidMount() {
    this.getLocation();
  }

  getForecast = (lat, lon) => {
    const api = `https://api.darksky.net/forecast/${apiToken}/${lat},${lon}`;

    jsonp(api, null, (error, response) => {
      if (error) {
        console.error(error.message);
      } else {
        this.setState({
          forecast: response,
          fetchingForecast: false,
          currently: response.currently,
          daily: response.daily,
          today: response.daily.data[0]
        });
      }
    });
  };

  lookUpLocation = (lat, lon) => {
    geocodingClient
      .reverseGeocode({
        query: [lat, lon],
        limit: 5
      })
      .send()
      .then(response => {
        const match = response.body;
        console.log('lookup', match);
        this.setState({
          location: match,
          fetchingLocation: false
        });
      });
  };

  getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        this.lookUpLocation(lat, lon);
        this.getForecast(lat, lon);
      },
      error => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  render() {
    const state = this.state;

    return (
      <article className={styles.app}>
        <h2>{state.address}</h2>
        {state.fetchingForecast ? (
          <p>Getting Forecast</p>
        ) : (
          <Current
            temperature={state.currently.temperature}
            temperatureHigh={state.today.temperatureHigh}
            temperatureLow={state.today.temperatureLow}
          />
        )}
      </article>
    );
  }
}

export default App;
