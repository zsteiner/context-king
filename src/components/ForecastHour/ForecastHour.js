import React from 'react';
import PropTypes from 'prop-types';

import styles from './ForecastHour.module.scss';
import TemperatureHour from '../TemperatureHour/TemperatureHour';

const ForecastHour = ({ extremes, forecast, timezone }) => {
  const date = new Date(forecast.time * 1000);
  const dateOptions = {
    hour: 'numeric',
    timeZone: timezone
  };
  const formattedTime = date.toLocaleTimeString('en-us', dateOptions);

  return (
    <li className={styles.forecastHour}>
      <time dateTime={forecast.time} className={styles.day}>
        {formattedTime}
      </time>
      <p className={styles.summary}>{forecast.summary}</p>
      <div className={styles.temperatures}>
        <TemperatureHour
          temperature={forecast.temperature}
          temperatureMax={extremes.max}
          temperatureMin={extremes.min}
        />
      </div>
    </li>
  );
};
ForecastHour.propTypes = {
  forecast: PropTypes.object,
  extremes: PropTypes.shape({
    max: PropTypes.number,
    min: PropTypes.number
  }),
  timezone: PropTypes.string
};
export default ForecastHour;
