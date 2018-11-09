import React from 'react';
import PropTypes from 'prop-types';

import styles from './DailyForecast.module.scss';
import ForecastDay from '../ForecastDay/ForecastDay';

const DailyForecast = ({ daily, timezone }) => {
  const sevenDayMax = [];
  const sevenDayMin = [];

  const dailyForecast = daily.data.map((item, index) => {
    sevenDayMax.push(item.temperatureMax);
    sevenDayMin.push(item.temperatureMin);
    return (
      <ForecastDay
        key={index}
        forecast={item}
        timezone={timezone}
        sevenDayMax={sevenDayMax}
        sevenDayMin={sevenDayMin}
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
