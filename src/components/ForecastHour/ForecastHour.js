import React from 'react';
import PropTypes from 'prop-types';

import Percentage from '../Percentage/Percentage';
import TemperatureHour from '../TemperatureHour/TemperatureHour';

import styles from './ForecastHour.module.scss';

const ForecastHour = ({ extremes, forecast, timezone }) => {
  const date = new Date(forecast.time * 1000);
  const dateOptions = {
    hour: 'numeric',
    timeZone: timezone
  };
  const formattedTime = date.toLocaleTimeString('en-us', dateOptions);

  return (
    <li className={styles.forecastHour}>
      <div className={styles.temperatures}>
        <TemperatureHour
          temperature={forecast.temperature}
          temperatureMax={extremes.max}
          temperatureMin={extremes.min}
        />
      </div>
      <time dateTime={forecast.time} className={styles.day}>
        {formattedTime}
      </time>

      <div className={styles.precipitation}>
        {forecast.precipProbability > 0 ? (
          <Percentage number={forecast.precipProbability} />
        ) : null}
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
