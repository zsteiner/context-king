import React, { Component } from 'react';

import axios from 'axios-jsonp-pro';

import config from '../config/config';
import buildConditionData from '../utils/buildConditionData';

import { LocationContext } from '../contexts/LocationContext';

import Button from '../components/Button/Button';
import Datepicker from '../components/Datepicker/Datepicker';
import TimemachineHeader from '../components/ForecastHeader/TimemachineHeader';
import HourlyForecast from '../components/HourlyForecast/HourlyForecast';
import Section from '../components/Section/Section';
import TimemachineHourlyCharts from '../components/TimemachineHourlyCharts/TimemachineHourlyCharts';

import styles from './Pages.module.scss';

class Timemachine extends Component {
  constructor(props) {
    super(props);

    const currentDate = new Date();
    this.state = {
      date: currentDate,
      timemachine: {},
      timemachineLocation: {},
    };
  }

  static contextType = LocationContext;

  getForecast = () => {
    const apiDarkskyToken = config.darkskyKey;
    const { coordinates } = this.context;
    const lon = coordinates[0];
    const lat = coordinates[1];
    const time = Math.round(new Date(this.state.date).getTime() / 1000);

    const api = `https://api.darksky.net/forecast/${apiDarkskyToken}/${lat},${lon},${time}?exclude=minutely,alerts,flags`;

    axios
      .jsonp(api, {
        timeout: 5000,
        headers: {
          'Accept-Encoding': 'gzip',
        },
      })
      .then((response) => {
        const { hourly } = response;
        const hourlyConditionData = buildConditionData(
          config.conditionList,
          hourly.data,
          hourly.timezone,
        );

        this.setState({
          hourlyConditions: hourlyConditionData,
          timemachine: response,
          timemachineLocation: this.context.location,
        });
      })
      .catch((error) => console.log(error));
  };

  componentDidMount() {
    if (this.state.timemachineLocation.text !== this.context.location.text) {
      this.getForecast();
    }
  }

  render() {
    const { date, timemachine, hourlyConditions } = this.state;
    const dateOptions = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    };
    const formattedDate = date.toLocaleDateString('en-us', dateOptions);

    return (
      <>
        <h1 className={styles.timemachineHeading}>
          Weather on
          {' '}
          {formattedDate}
        </h1>
        <Section className={styles.timemachineHeader}>
          <div>
            <Datepicker
              date={date}
              onChange={(date) => this.setState({ date })}
            />
            <Button
              onClick={this.getForecast}
              text="Get Timemachine Forecast"
            />
          </div>
          {timemachine.currently ? (
            <TimemachineHeader forecast={timemachine} narrow />
          ) : null}
        </Section>
        <Section>
          {timemachine.hourly ? (
            <HourlyForecast
              hourly={timemachine.hourly.data.slice(1, 25)}
              showTitle
              showTemperatures
              timezone={timemachine.timezone}
            />
          ) : null}
        </Section>
        {hourlyConditions ? (
          <TimemachineHourlyCharts
            hourlyConditions={hourlyConditions}
            timezone={timemachine.timezone}
          />
        ) : null}
      </>
    );
  }
}

export default Timemachine;
