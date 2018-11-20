import React from 'react';
import PropTypes from 'prop-types';

import styles from './ForecastDay.module.scss';

import Precipitation from '../Precipitation/Precipitation';
import TemperatureRange from '../TemperatureRange/TemperatureRange';
import WeatherIcon from '../WeatherIcon/WeatherIcon';

const ForecastDay = ({ extremes, forecast, timezone }) => {
  const date = new Date(forecast.time * 1000);
  const dateOptions = {
    weekday: 'long',
    timeZone: timezone
  };
  const formattedTime = date.toLocaleDateString('en-us', dateOptions);

  return (
    <li>
      <section className={styles.forecastDay}>
        <WeatherIcon conditions={forecast.icon} className={styles.icon} />
        <div className={styles.forecastDayMeta}>
          <time dateTime={forecast.time} className={styles.day}>
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
      </section>
    </li>
  );
};
ForecastDay.propTypes = {
  forecast: PropTypes.object,
  extremes: PropTypes.shape({
    max: PropTypes.number,
    min: PropTypes.number
  }),
  timezone: PropTypes.string
};
export default ForecastDay;
