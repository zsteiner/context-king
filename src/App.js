import React, { Component } from 'react';

import axios from 'axios-jsonp-pro';
import getBackground from './utils/getBackground';

import Attribution from './components/Attribution/Attribution';
import Loading from './components/Loading/Loading';
import Location from './components/Location/Location';
import Forecast from './components/Forecast/Forecast';
import { ReactComponent as IconSet } from './assets/WeatherIcons.svg';

import { LocationContext } from './contexts/LocationContext';

import styles from './styles/App.module.scss';

const mockForecast = require('./mockData/mockForecast.json');
const apiDarkskyToken = '16eb53a912c674ef3028c1c421473d5e';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      backgroundImage: {},
      coordinates: [],
      fetchingForecast: true,
      forecast: mockForecast,
      location: {},
      setBackgroundImage: this.setBackgroundImage,
      setLoading: this.setLoading,
      setLocation: this.setLocation
    };
  }

  setLoading = () => {
    this.setState({
      fetchingForecast: true
    });
  };

  setLocation = (location, locationName, coordinates) => {
    getBackground(locationName, this.setBackgroundImage);
    this.getForecast(coordinates);

    this.setState({
      location: location,
      coordinates: coordinates
    });
  };

  setBackgroundImage = backgroundImage => {
    this.setState({
      backgroundImage: backgroundImage
    });
  };

  getForecast = coordinates => {
    const lon = coordinates[0];
    const lat = coordinates[1];
    const api = `https://api.darksky.net/forecast/${apiDarkskyToken}/${lat},${lon}?exclude=minutely`;

    this.setLoading();
    axios
      .jsonp(api, {
        timeout: 5000
      })
      .then(response => {
        this.setState({
          forecast: response,
          fetchingForecast: false
        });
      })
      .catch(error => console.log(error));
  };

  render() {
    const state = this.state;

    return [
      <IconSet key={0} />,
      <article key={1} className={styles.app}>
        <LocationContext.Provider value={this.state}>
          <Location />
          {state.fetchingForecast ? <Loading /> : <Forecast />}
        </LocationContext.Provider>
        {state.backgroundImage.user ? (
          <Attribution user={state.backgroundImage.user} />
        ) : null}
      </article>
    ];
  }
}

export default App;
