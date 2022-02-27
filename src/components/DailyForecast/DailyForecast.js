import React from 'react';
import PropTypes from 'prop-types';

import calcExtremes from '../../utils/calcExtremes';
import getDay from '../../utils/getDay';

import ForecastDay from '../ForecastDay/ForecastDay';

import styles from './DailyForecast.module.scss';

function DailyForecast({ daily, hourly, timezone }) {
  let extremes = {
    max: 0,
    min: 100,
  };

  const dailyForecast = daily.data.map((item) => {
    const low = item.temperatureMin < item.temperatureLow
      ? item.temperatureMin
      : item.temperatureLow;

    const high = item.temperatureMax > item.temperatureHigh
      ? item.temperatureMax
      : item.temperatureHigh;

    extremes = calcExtremes(extremes, high, low);
    const day = getDay(item.time, timezone);
    const hourlyForecast = hourly.filter(
      (newItem) => getDay(newItem.time, timezone) === day,
    );

    return (
      <ForecastDay
        key={item.time}
        forecast={item}
        hourly={hourlyForecast}
        timezone={timezone}
        extremes={extremes}
      />
    );
  });

  return (
    <>
      <h3 className="header--strong">This Week</h3>
      <p className={styles.forecastSummary}>{daily.summary}</p>
      <ul className={`${styles.dailyForecast} list-clear`}>{dailyForecast}</ul>
    </>
  );
}

DailyForecast.propTypes = {
  daily: PropTypes.object,
  hourly: PropTypes.array,
  timezone: PropTypes.string,
};

export default DailyForecast;
