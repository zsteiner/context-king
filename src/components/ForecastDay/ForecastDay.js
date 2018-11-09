import React from 'react';
import PropTypes from 'prop-types';

import styles from './ForecastDay.module.scss';
import TemperatureRange from '../TemperatureRange/TemperatureRange';

const ForecastDay = ({ forecast, sevenDayMax, sevenDayMin, timezone }) => {
  const date = new Date(forecast.time * 1000);
  const dateOptions = {
    weekday: 'long',
    timeZone: timezone
  };
  const formattedTime = date.toLocaleDateString('en-us', dateOptions);

  const temperatureMax = Math.max(...sevenDayMax);
  const temperatureMin = Math.min(...sevenDayMin);

  return (
    <li className={styles.forecastDay}>
      <div className={styles.forecastDayMeta}>
        <time dateTime={forecast.time} className={styles.day}>
          {formattedTime}
        </time>
        <p className={styles.summary}>{forecast.summary}</p>
      </div>
      <TemperatureRange
        temperatureLow={forecast.temperatureLow}
        temperatureHigh={forecast.temperatureHigh}
        temperatureMax={temperatureMax}
        temperatureMin={temperatureMin}
      />
    </li>
  );
};
ForecastDay.propTypes = {
  forecast: PropTypes.object,
  sevenDayMax: PropTypes.array,
  sevenDayMin: PropTypes.array,
  timezone: PropTypes.string
};
export default ForecastDay;
