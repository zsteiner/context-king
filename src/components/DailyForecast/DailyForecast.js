import React from 'react';
import PropTypes from 'prop-types';

import styles from './DailyForecast.module.scss';
import ForecastDay from '../ForecastDay/ForecastDay';

const DailyForecast = ({ daily, timezone }) => {
  const extremes = {
    max: 0,
    min: 0
  };

  const dailyForecast = daily.data.map((item, index) => {
    extremes.max =
      item.temperatureMax > extremes.max ? item.temperatureMax : extremes.max;

    extremes.min =
      item.temperatureMin < extremes.min ? item.temperatureMin : extremes.min;

    return (
      <ForecastDay
        key={index}
        forecast={item}
        timezone={timezone}
        extremes={extremes}
      />
    );
  });

  return (
    <ul className={`${styles.dailyForecast} list-clear`}>{dailyForecast}</ul>
  );
};

DailyForecast.propTypes = {
  daily: PropTypes.object,
  timezone: PropTypes.string
};

export default DailyForecast;
