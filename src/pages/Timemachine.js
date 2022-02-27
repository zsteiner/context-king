import React, { Component } from 'react';

import axios from 'axios-jsonp-pro';

import config from '../config/config';
import buildConditionData from '../utils/buildConditionData';

import LocationContext from '../contexts/LocationContext';

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

  componentDidMount() {
    const { timemachineLocation } = this.state;
    const { location } = this.context;

    if (timemachineLocation.text !== location.text) {
      this.getForecast();
    }
  }

  getForecast = () => {
    const apiDarkskyToken = config.darkskyKey;
    const { coordinates } = this.context;
    const lon = coordinates[0];
    const lat = coordinates[1];
    const { date } = this.state;
    const time = Math.round(new Date(date).getTime() / 1000);

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

        const { location } = this.context;

        this.setState({
          hourlyConditions: hourlyConditionData,
          timemachine: response,
          timemachineLocation: location,
        });
      })
      // eslint-disable-next-line no-console
      .catch((error) => console.log(error));
  };

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
              onChange={(newDate) => this.setState({ date: newDate })}
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

Timemachine.contextType = LocationContext;

export default Timemachine;
