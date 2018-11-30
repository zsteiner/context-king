import React from 'react';

import getTime from '../../utils/getTime';
import makePercent from '../../utils/makePercent';

import MoonPhase from '../MoonPhase/MoonPhase';
import WeatherIcon from '../WeatherIcon/WeatherIcon';

import styles from './ForecastDayStats.module.scss';

const ForecastDayStats = ({ forecast, timezone }) => {
  return (
    <div className={styles.stats}>
      <div className={styles.statsItem}>
        <span className={styles.sunItem}>
          <WeatherIcon icon="Sunrise" className={styles.sun} />
          {getTime(forecast.sunriseTime, timezone)}
        </span>
        <span className={styles.sunItem}>
          <WeatherIcon icon="Sunset" className={styles.sun} />
          {getTime(forecast.sunsetTime, timezone)}
        </span>
        <span className={styles.sunItem}>
          <MoonPhase moonPhase={forecast.moonPhase} />
        </span>
      </div>
      <div className={styles.statsItem}>
        <strong>UV Index</strong> {forecast.uvIndex}
      </div>
      <div className={styles.statsItem}>
        <strong>Humidity</strong> {makePercent(forecast.humidity)}
      </div>
    </div>
  );
};

export default ForecastDayStats;
