import React from 'react';
import PropTypes from 'prop-types';

import styles from './DailyForecast.module.scss';
import ForecastDay from '../ForecastDay/ForecastDay';

const DailyForecast = ({ daily, timezone }) => {
  const dailyForecast = daily.data.map((item, index) => {
    return <ForecastDay key={index} forecast={item} timezone={timezone} />;
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
