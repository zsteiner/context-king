import React, { Component } from 'react';

import axios from 'axios-jsonp-pro';

import config from '../config/config';
import buildConditionData from '../utils/buildConditionData';

import { LocationContext } from '../contexts/LocationContext';

import Button from '../components/Button/Button';
import Datepicker from '../components/Datepicker/Datepicker';
import ForecastHeader from '../components/ForecastHeader/ForecastHeader';
import HourlyForecast from '../components/HourlyForecast/HourlyForecast';
import Section from '../components/Section/Section';

class Timemachine extends Component {
  constructor(props) {
    super(props);

    const currentDate = new Date();
    this.state = {
      date: currentDate,
      timemachine: {},
      timemachineLocation: {}
    };
  }

  static contextType = LocationContext;

  getForecast = () => {
    const apiDarkskyToken = config.apiDarkskyToken;
    const coordinates = this.context.coordinates;
    const lon = coordinates[0];
    const lat = coordinates[1];
    const time = Math.round(new Date(this.state.date).getTime() / 1000);

    const api = `https://api.darksky.net/forecast/${apiDarkskyToken}/${lat},${lon},${time}?exclude=minutely,alerts,flags`;

    axios
      .jsonp(api, {
        timeout: 5000,
        headers: {
          'Accept-Encoding': 'gzip'
        }
      })
      .then(response => {
        const hourlyHumdity = buildConditionData(
          'humidity',
          response.hourly.data
        );

        const hourlyUvIndex = buildConditionData(
          'uvIndex',
          response.hourly.data
        );

        const hourlyWindSpeed = buildConditionData(
          'windSpeed',
          response.hourly.data
        );

        this.setState({
          hourlyHumdity: hourlyHumdity,
          hourlyUvIndex: hourlyUvIndex,
          hourlyWindSpeed: hourlyWindSpeed,
          timemachine: response,
          timemachineLocation: this.context.location
        });
      })
      .catch(error => console.log(error));
  };

  componentDidMount() {
    if (this.state.timemachineLocation.text !== this.context.location.text) {
      this.getForecast();
    }
  }

  render() {
    const { date, timemachine } = this.state;
    const dateOptions = {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    };
    const formattedDate = date.toLocaleDateString('en-us', dateOptions);

    return (
      <React.Fragment>
        <h1 className="header--strong">Time Machine</h1>
        <p>See weather for {formattedDate}</p>
        <Section>
          <Datepicker date={date} onChange={date => this.setState({ date })} />
          <Button onClick={this.getForecast} text="Get Timemachine Forecast" />
        </Section>
        {timemachine.currently ? (
          <ForecastHeader forecast={timemachine} />
        ) : null}
        <Section>
          {timemachine.hourly ? (
            <HourlyForecast
              hourly={timemachine.hourly.data.slice(1, 25)}
              showTitle={true}
              showTemperatures={true}
              timezone={timemachine.timezone}
            />
          ) : null}
        </Section>
      </React.Fragment>
    );
  }
}

export default Timemachine;
