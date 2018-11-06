import React, { Component } from 'react';

import jsonp from 'jsonp';

import Location from './components/Location/Location';
import Current from './components/Current/Current';

import { CoordinateContext } from './contexts/CoordinateContext';

import styles from './styles/App.module.scss';

const mockForecast = require('./mockData/mockForecast.json');

const apiToken = '16eb53a912c674ef3028c1c421473d5e';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coordinates: [],
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

  getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        this.getForecast(lat, lon);

        this.setState({
          coordinates: [lat, lon]
        });
      },
      error => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    console.log('getLocation');
  };

  render() {
    const state = this.state;

    return (
      <article className={styles.app}>
        <CoordinateContext.Provider value={this.state.coordinates}>
          <Location getLocation={this.getLocation} />
        </CoordinateContext.Provider>
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
