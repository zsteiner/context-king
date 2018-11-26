import React, { Component } from 'react';

import axios from 'axios-jsonp-pro';
import moment from 'moment';

import getBackground from './utils/getBackground';
import setBackground from './utils/setBackground';

import Attribution from './components/Attribution/Attribution';
import Loading from './components/Loading/Loading';
import Location from './components/Location/Location';
import Forecast from './components/Forecast/Forecast';
import { ReactComponent as IconSet } from './assets/WeatherIcons.svg';

import { LocationContext } from './contexts/LocationContext';

import styles from './styles/App.module.scss';

const apiDarkskyToken = '16eb53a912c674ef3028c1c421473d5e';

class App extends Component {
  constructor(props) {
    super(props);

    const updateDate = localStorage.hasOwnProperty('updateDate')
      ? localStorage.getItem('updateDate')
      : new Date();

    const storedCoordinates = localStorage.hasOwnProperty('storedCoordinates')
      ? JSON.parse(localStorage.getItem('storedCoordinates'))
      : [];

    const storedLocation = JSON.parse(localStorage.getItem('storedLocation'));

    const storedBackground = localStorage.hasOwnProperty('storedBackground')
      ? JSON.parse(localStorage.getItem('storedBackground'))
      : {};

    const storedForecast = localStorage.hasOwnProperty('storedForecast')
      ? JSON.parse(localStorage.getItem('storedForecast'))
      : {};

    this.state = {
      backgroundImage: storedBackground,
      coordinates: storedCoordinates,
      fetchingForecast: true,
      forecast: storedForecast,
      forecastRefresh: true,
      location: storedLocation,
      updateBackgroundImage: this.updateBackgroundImage,
      setLoading: this.setLoading,
      setLocation: this.setLocation,
      updateDate: updateDate
    };
  }

  setLoading = () => {
    this.setState({
      fetchingForecast: true
    });
  };

  setLocation = (location, locationName, coordinates) => {
    const currentDate = moment();
    const updateDate = moment(new Date(this.state.updateDate).toISOString());
    const sinceUpdate = updateDate.diff(currentDate, 'minutes');

    const storedCoordinates = this.state.coordinates;

    if (sinceUpdate < 0 && coordinates[0] === storedCoordinates[0]) {
      const image = this.state.backgroundImage;
      setBackground(image.urls.full, image.color);

      this.setState({
        fetchingForecast: false,
        forecastRefresh: false
      });
    } else {
      const updateDate = new Date();

      localStorage.setItem('storedCoordinates', JSON.stringify(coordinates));
      localStorage.setItem('storedLocation', JSON.stringify(location));
      localStorage.setItem('updateDate', updateDate);

      getBackground(locationName, this.updateBackgroundImage);
      this.getForecast(coordinates);

      this.setState({
        forecastRefresh: true,
        location: location,
        coordinates: coordinates
      });
    }
  };

  updateBackgroundImage = backgroundImage => {
    this.setState({
      backgroundImage: backgroundImage
    });
  };

  getForecast = coordinates => {
    const lon = coordinates[0];
    const lat = coordinates[1];
    const api = `https://api.darksky.net/forecast/${apiDarkskyToken}/${lat},${lon}?exclude=minutely,alerts,flags&extend=hourly`;

    this.setLoading();

    axios
      .jsonp(api, {
        timeout: 5000,
        headers: {
          'Accept-Encoding': 'gzip'
        }
      })
      .then(response => {
        localStorage.setItem('storedForecast', JSON.stringify(response));
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
