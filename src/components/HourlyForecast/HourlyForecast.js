import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ForecastHour from '../ForecastHour/ForecastHour';
import calcExtremes from '../../utils/calcExtremes';
import styles from './HourlyForecast.module.scss';

function HourlyForecast({
  hourly, showTemperatures, showTitle, timezone,
}) {
  let extremes = {
    max: 0,
    min: 100,
  };

  const hourlyForecast = hourly
    .filter((item, index) => index % 2 === 0)
    .map((item) => {
      extremes = calcExtremes(extremes, item.temperature, item.temperature);

      return (
        <ForecastHour
          key={item.temperature}
          forecast={item}
          timezone={timezone}
          extremes={extremes}
          showTemperatures={showTemperatures}
        />
      );
    });

  const hourlyForecastClasses = classNames({
    [styles.hourlyForecast]: true,
    'list-clear': true,
  });

  return (
    <>
      {showTitle ? <h3 className="header--strong">Today</h3> : null}
      <ul className={hourlyForecastClasses}>{hourlyForecast}</ul>
    </>
  );
}

HourlyForecast.propTypes = {
  hourly: PropTypes.array,
  showTemperatures: PropTypes.bool,
  showTitle: PropTypes.bool,
  timezone: PropTypes.string,
};

export default HourlyForecast;
