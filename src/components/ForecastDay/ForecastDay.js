import React, { Component } from 'react';
import PropTypes from 'prop-types';

import getFullDate from '../../utils/getFullDate';
import getWeekday from '../../utils/getWeekday';

import styles from './ForecastDay.module.scss';

import HourlyForecast from '../HourlyForecast/HourlyForecast';
import Precipitation from '../Precipitation/Precipitation';
import TemperatureRange from '../TemperatureRange/TemperatureRange';
import WeatherIcon from '../WeatherIcon/WeatherIcon';
import OpenButton from '../OpenButton/OpenButton';
import ForecastDayStats from '../ForecastDayStats/ForecastDayStats';
import SunStats from '../SunStats/SunStats';
import TemperatureHighLow from '../TemperatureHighLow/TemperatureHighLow';
import FlexRow from '../FlexRow/FlexRow';

class ForecastDay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      breakoutOpen: false,
    };
  }

  toggleBreakout = () => {
    const { breakoutOpen } = this.state;
    this.setState({
      breakoutOpen: !breakoutOpen,
    });
  };

  render() {
    const {
      extremes,
      forecast,
      hourly,
      timezone,
    } = this.props;
    const { breakoutOpen } = this.state;
    const formattedTime = getWeekday(forecast.time, timezone);
    const fullDate = getFullDate(forecast.time, timezone);

    return (
      <li>
        <section className={styles.forecastDay}>
          <WeatherIcon conditions={forecast.icon} className={styles.icon} />
          <div className={styles.forecastDayMeta}>
            <time dateTime={fullDate} className={styles.day}>
              {formattedTime}
            </time>
            <p className={styles.summary}>{forecast.summary}</p>
            <Precipitation
              precipProbability={forecast.precipProbability}
              precipType={forecast.precipType}
            />
          </div>
          <TemperatureRange
            temperatureLow={forecast.temperatureLow}
            temperatureHigh={forecast.temperatureHigh}
            temperatureMax={extremes.max}
            temperatureMin={extremes.min}
          />

          <OpenButton
            onClick={this.toggleBreakout}
            isOpen={breakoutOpen}
          />
        </section>
        {breakoutOpen ? (
          <section className={styles.hourBreakout}>
            <FlexRow className={styles.hourBreakoutRow}>
              <TemperatureHighLow
                temperatureHigh={forecast.temperatureHigh}
                temperatureHighTime={forecast.temperatureHighTime}
                temperatureLow={forecast.temperatureLow}
                temperatureLowTime={forecast.temperatureLowTime}
                forecast={forecast.timezone}
              />
              <SunStats
                sunriseTime={forecast.sunriseTime}
                sunsetTime={forecast.sunsetTime}
                moonPhase={forecast.moonPhase}
                timezone={forecast.timezone}
              />
            </FlexRow>
            <ForecastDayStats forecast={forecast} timezone={timezone} />
            <HourlyForecast hourly={hourly} timezone={timezone} />
          </section>
        ) : null}
      </li>
    );
  }
}

ForecastDay.propTypes = {
  forecast: PropTypes.object,
  extremes: PropTypes.shape({
    max: PropTypes.number,
    min: PropTypes.number,
  }),
  hourly: PropTypes.array,
  timezone: PropTypes.string,
};

export default ForecastDay;
