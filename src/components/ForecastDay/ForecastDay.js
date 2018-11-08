import React from 'react';
import PropTypes from 'prop-types';

import styles from './ForecastDay.module.scss';

const ForecastDay = ({ forecast, timezone }) => {
  const date = new Date(forecast.time * 1000);
  const dateOptions = {
    weekday: 'long',
    timeZone: timezone
  };
  const formattedTime = date.toLocaleDateString('en-us', dateOptions);

  return (
    <li className={styles.forecastDay}>
      <time dateTime={forecast.time} className={styles.day}>
        {formattedTime}
      </time>
      {forecast.summary}
      <span className={styles.tempHigh}>
        {Math.round(forecast.temperatureHigh)}
      </span>
    </li>
  );
};
ForecastDay.propTypes = {
  forecast: PropTypes.object,
  timezone: PropTypes.string
};
export default ForecastDay;
