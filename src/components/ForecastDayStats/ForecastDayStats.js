import React from 'react';

import makePercent from '../../utils/makePercent';

import StatsItem from '../StatsItem/StatsItem';
import SunStats from '../SunStats/SunStats';

import styles from './ForecastDayStats.module.scss';

const ForecastDayStats = ({ forecast, timezone }) => {
  return (
    <React.Fragment>
      <div className={styles.stats}>
        <SunStats
          sunriseTime={forecast.sunriseTime}
          sunsetTime={forecast.sunsetTime}
          moonPhase={forecast.moonPhase}
          timezone={timezone}
        />
        <StatsItem label="UV Index" value={forecast.uvIndex} />
        <StatsItem label="Humidity" value={makePercent(forecast.humidity)} />
      </div>
      <div className={`${styles.stats} ${styles.statsSecondary}`}>
        <StatsItem
          label="Precipitation"
          value={makePercent(forecast.precipProbability)}
        />
        <StatsItem label="Ozone" value={forecast.ozone} />
        <StatsItem label="Wind" value={`${forecast.windSpeed} mph`} />
      </div>
    </React.Fragment>
  );
};

export default ForecastDayStats;
