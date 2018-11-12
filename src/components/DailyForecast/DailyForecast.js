import React from 'react';
import PropTypes from 'prop-types';

import calcExtremes from '../../utils/calcExtremes';

import ForecastDay from '../ForecastDay/ForecastDay';

import styles from './DailyForecast.module.scss';

const DailyForecast = ({ daily, timezone }) => {
  const extremes = {
    max: 0,
    min: 100
  };

  const dailyForecast = daily.data.map((item, index) => {
    calcExtremes(extremes, item.temperatureMax, item.temperatureMin);

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
    <React.Fragment>
      <h3 className={styles.forecastSummaryTitle}>This Week</h3>
      <p className={styles.forecastSummary}>{daily.summary}</p>
      <ul className={`${styles.dailyForecast} list-clear`}>{dailyForecast}</ul>
    </React.Fragment>
  );
};

DailyForecast.propTypes = {
  daily: PropTypes.object,
  timezone: PropTypes.string
};

export default DailyForecast;
