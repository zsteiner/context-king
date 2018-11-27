import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import calcExtremes from '../../utils/calcExtremes';

import ForecastHour from '../ForecastHour/ForecastHour';

import styles from './HourlyForecast.module.scss';

const HourlyForecast = ({ hourly, showTemperatures, showTitle, timezone }) => {
  let extremes = {
    max: 0,
    min: 100
  };

  const hourlyForecast = hourly
    .filter((item, index) => index % 2 === 0)
    .map((item, index) => {
      extremes = calcExtremes(extremes, item.temperature, item.temperature);

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

  const itemCount = Math.round(hourly.length / 2);

  const hourlyForecastClasses = classNames({
    [styles.hourlyForecast]: true,
    'list-clear': true
  });
  console.log('itemCount', itemCount);
  return (
    <React.Fragment>
      {showTitle ? (
        <h3 className={styles.forecastSummaryTitle}>Today</h3>
      ) : null}
      <ul className={hourlyForecastClasses}>{hourlyForecast}</ul>
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
