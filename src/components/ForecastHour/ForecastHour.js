import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import ConditionBar from '../ConditionBar/ConditionBar';
import Precipitation from '../Precipitation/Precipitation';
import TemperatureHour from '../TemperatureHour/TemperatureHour';

import styles from './ForecastHour.module.scss';

const ForecastHour = ({ extremes, forecast, showTemperatures, timezone }) => {
  const date = new Date(forecast.time * 1000);
  const dateOptions = {
    hour: 'numeric',
    timeZone: timezone
  };
  const formattedTime = date.toLocaleTimeString('en-us', dateOptions);

  const forecastClasses = classNames({
    [styles.forecastHour]: true,
    [styles.forecastHourTemps]: showTemperatures
  });

  return (
    <li className={forecastClasses}>
      <div className={styles.temperatures}>
        <TemperatureHour
          temperature={forecast.temperature}
          temperatureMax={extremes.max}
          temperatureMin={extremes.min}
        />
      </div>
      <ConditionBar
        cloudCover={forecast.cloudCover}
        precipIntensity={forecast.precipIntensity}
        precipType={forecast.precipType}
      />
      <time dateTime={forecast.time} className={styles.day}>
        {formattedTime}
      </time>

      <Precipitation
        precipProbability={forecast.precipProbability}
        precipType={forecast.precipType}
      />
    </li>
  );
};
ForecastHour.propTypes = {
  forecast: PropTypes.object,
  extremes: PropTypes.shape({
    max: PropTypes.number,
    min: PropTypes.number
  }),
  showTemperatures: PropTypes.bool,
  timezone: PropTypes.string
};
export default ForecastHour;
