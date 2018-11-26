import React from 'react';
import PropTypes from 'prop-types';

import calcExtremes from '../../utils/calcExtremes';
import getDay from '../../utils/getDay';

import ForecastDay from '../ForecastDay/ForecastDay';

import styles from './DailyForecast.module.scss';

const DailyForecast = ({ daily, hourly, timezone }) => {
  let extremes = {
    max: 0,
    min: 100
  };

  const dailyForecast = daily.data.map((item, index) => {
    const low =
      item.temperatureMin < item.temperatureLow
        ? item.temperatureMin
        : item.temperatureLow;

    const high =
      item.temperatureMax > item.temperatureHigh
        ? item.temperatureMax
        : item.temperatureHigh;

    extremes = calcExtremes(extremes, high, low);
    const day = getDay(item.time);
    const hourlyForecast = hourly.filter(item => getDay(item.time) === day);

    return (
      <ForecastDay
        key={index}
        forecast={item}
        hourly={hourlyForecast}
        timezone={timezone}
        extremes={extremes}
      />
    );
  });

  return (
    <React.Fragment>
      <h3 className={styles.forecastSummaryTitle}>This Week</h3>
      <p className={styles.forecastSummary}>{daily.summary}</p>
      <ul className={`${styles.dailyForecast} list-clear`}>{dailyForecast}</ul>
    </React.Fragment>
  );
};

DailyForecast.propTypes = {
  daily: PropTypes.object,
  hourly: PropTypes.array,
  timezone: PropTypes.string
};

export default DailyForecast;
