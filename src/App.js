import React, { Component } from 'react';

import jsonp from 'jsonp';

import Current from './components/Current/Current';

import styles from './styles/App.module.scss';

const mockForecast = require('./mockData/mockForecast.json');

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      forecast: {},
      currently: {},
      daily: {},
      today: {}
    };
  }

  componentDidMount() {
    // this.getForecast();

    this.setState({
      forecast: mockForecast,
      currently: mockForecast.currently,
      daily: mockForecast.daily,
      today: mockForecast.daily.data[0]
    });
  }

  getForecast = () => {
    const apiToken = '16eb53a912c674ef3028c1c421473d5e';
    const lat = 39.752394749115744;
    const long = -105.00245891387033;
    const api = `https://api.darksky.net/forecast/${apiToken}/${lat},${long}`;

    jsonp(api, null, (error, response) => {
      if (error) {
        console.error(error.message);
      } else {
        this.setState({
          forecast: response
        });
      }
    });
  };

  render() {
    const state = this.state;

    return (
      <article className={styles.app}>
        <Current
          temperature={state.currently.temperature}
          temperatureHigh={state.today.temperatureHigh}
          temperatureLow={state.today.temperatureLow}
        />
      </article>
    );
  }
}

export default App;
