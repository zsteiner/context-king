import React from 'react';

import CurrentMeter from '../CurrentMeter/CurrentMeter';
import ForecastDayStats from '../ForecastDayStats/ForecastDayStats';
import Temperature from '../Temperature/Temperature';
import WeatherIcon from '../WeatherIcon/WeatherIcon';

import styles from './ForecastHeader.module.scss';

const ForecastHeader = ({ forecast, timezone }) => {
  return (
    <header className={styles.forecastCurrent}>
      <CurrentMeter forecast={forecast} />
      <div className={styles.forecastInfo}>
        <div className={styles.forecastConditions}>
          <WeatherIcon
            conditions={forecast.currently.icon}
            className={styles.icon}
          />
          <div>
            <h2>{forecast.currently.summary}</h2>
            <p className={styles.forecastText}>
              Feels like{' '}
              <Temperature temp={forecast.currently.apparentTemperature} />
            </p>
          </div>
        </div>
        <p className={styles.forecastText}>
          <strong className={styles.forecastSummary}>Today: </strong>
          {forecast.daily.data[0].summary}
        </p>
        <ForecastDayStats
          forecast={forecast.daily.data[0]}
          timezone={forecast.timezone}
        />
      </div>
    </header>
  );
};

export default ForecastHeader;
