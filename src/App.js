import React, { Component } from 'react';

import axios from 'axios-jsonp-pro';
import moment from 'moment';

import getBackground from './utils/getBackground';
import setBackground from './utils/setBackground';

import AppRouter from './components/AppRouter/AppRouter';
import Attribution from './components/Attribution/Attribution';
import Loading from './components/Loading/Loading';
import Location from './components/Location/Location';
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

    const storedLocationName = localStorage.getItem('storedLocationName');

    const storedBackground = localStorage.hasOwnProperty('storedBackground')
      ? JSON.parse(localStorage.getItem('storedBackground'))
      : {};

    const storedForecast = localStorage.hasOwnProperty('storedForecast')
      ? JSON.parse(localStorage.getItem('storedForecast'))
      : {};

    const currentDate = moment();
    const updateDateFormat = moment(new Date(updateDate).toISOString());
    const sinceUpdate = currentDate.diff(updateDateFormat, 'minutes');

    this.state = {
      backgroundImage: storedBackground,
      coordinates: storedCoordinates,
      fetchingForecast: true,
      forecast: storedForecast,
      forecastRefresh: true,
      location: storedLocation,
      locationName: storedLocationName,
      updateBackgroundImage: this.updateBackgroundImage,
      setLoading: this.setLoading,
      setLocation: this.setLocation,
      sinceUpdate: sinceUpdate,
      updateDate: updateDate
    };
  }

  setLoading = () => {
    this.setState({
      fetchingForecast: true
    });
  };

  setLocation = (location, locationName, coordinates) => {
    const { sinceUpdate } = this.state;
    const storedCoordinates = this.state.coordinates;

    if (sinceUpdate < 30 && coordinates[0] === storedCoordinates[0]) {
      const image = this.state.backgroundImage;
      setBackground(image.urls.full, image.color);

      this.setState({
        fetchingForecast: false,
        forecastRefresh: false,
        locationName: locationName,
        sinceUpdate: sinceUpdate
      });
    } else {
      const updateDate = new Date();

      localStorage.setItem('storedCoordinates', JSON.stringify(coordinates));
      localStorage.setItem('storedLocation', JSON.stringify(location));
      localStorage.setItem('updateDate', updateDate);

      getBackground(locationName, this.updateBackgroundImage);
      this.getForecast(coordinates);

      this.setState({
        coordinates: coordinates,
        forecastRefresh: true,
        location: location,
        locationName: locationName,
        sinceUpdate: sinceUpdate,
        updateDate: updateDate
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
          {state.fetchingForecast ? <Loading /> : <AppRouter />}
        </LocationContext.Provider>
      </article>,
      state.backgroundImage.user ? (
        <Attribution key={3} user={state.backgroundImage.user} />
      ) : null
    ];
  }
}

export default App;
