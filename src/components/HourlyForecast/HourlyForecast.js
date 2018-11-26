import React from 'react';
import PropTypes from 'prop-types';

import calcExtremes from '../../utils/calcExtremes';

import ForecastHour from '../ForecastHour/ForecastHour';

import styles from './HourlyForecast.module.scss';

const HourlyForecast = ({ hourly, showTemperatures, showTitle, timezone }) => {
  const extremes = {
    max: 0,
    min: 100
  };

  const hourlyForecast = hourly
    .filter((item, index) => index % 2 === 0)
    .map((item, index) => {
      calcExtremes(extremes, item.temperature, item.temperature);

      return (
        <ForecastHour
          key={index}
          forecast={item}
          timezone={timezone}
          extremes={extremes}
          showTemperatures={showTemperatures}
        />
      );
    });

  return (
    <React.Fragment>
      {showTitle ? (
        <h3 className={styles.forecastSummaryTitle}>Today</h3>
      ) : null}
      <ul className={`${styles.hourlyForecast} list-clear`}>
        {hourlyForecast}
      </ul>
    </React.Fragment>
  );
};

HourlyForecast.propTypes = {
  hourly: PropTypes.array,
  showTemperatures: PropTypes.bool,
  showTitle: PropTypes.bool,
  timezone: PropTypes.string
};

export default HourlyForecast;
