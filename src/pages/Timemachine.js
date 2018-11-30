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
import TimemachineChart from '../components/TimemachineChart/TimemachineChart';

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
        const hourly = response.hourly;
        const hourlyHumdity = buildConditionData(
          'humidity',
          hourly.data,
          hourly.timezone
        );

        const hourlyUvIndex = buildConditionData(
          'uvIndex',
          hourly.data,
          hourly.timezone
        );

        const hourlyWindSpeed = buildConditionData(
          'windSpeed',
          hourly.data,
          hourly.timezone
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
        <TimemachineChart
          data={this.state.hourlyHumdity}
          title="Humidity"
          format="percent"
        />
        <TimemachineChart
          data={this.state.hourlyUvIndex}
          title="UV Index"
          format="decimal"
        />
        <TimemachineChart
          data={this.state.hourlyWindSpeed}
          title="Wind Speed"
          format="number"
        />
      </React.Fragment>
    );
  }
}

export default Timemachine;
