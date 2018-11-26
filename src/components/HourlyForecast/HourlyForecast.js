import React from 'react';
import PropTypes from 'prop-types';

import calcExtremes from '../../utils/calcExtremes';

import ForecastHour from '../ForecastHour/ForecastHour';

import styles from './HourlyForecast.module.scss';

const HourlyForecast = ({ hourly, timezone }) => {
  const extremes = {
    max: 0,
    min: 100
  };

  const hourlyForecast = hourly.data
    .slice(1, 25)
    .filter((item, index) => index % 2 === 0)
    .map((item, index) => {
      calcExtremes(extremes, item.temperature, item.temperature);

      return (
        <ForecastHour
          key={index}
          forecast={item}
          timezone={timezone}
          extremes={extremes}
          showTemperatures={true}
        />
      );
    });

  return (
    <React.Fragment>
      <h3 className={styles.forecastSummaryTitle}>Today</h3>
      <ul className={`${styles.hourlyForecast} list-clear`}>
        {hourlyForecast}
      </ul>
    </React.Fragment>
  );
};

HourlyForecast.propTypes = {
  hourly: PropTypes.object,
  timezone: PropTypes.string
};

export default HourlyForecast;
