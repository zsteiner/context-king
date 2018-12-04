import React from 'react';
import PropTypes from 'prop-types';

import CurrentMeter from '../CurrentMeter/CurrentMeter';
import ForecastDayStats from '../ForecastDayStats/ForecastDayStats';
import SunStats from '../SunStats/SunStats';
import Temperature from '../Temperature/Temperature';
import WeatherIcon from '../WeatherIcon/WeatherIcon';

import styles from './ForecastHeader.module.scss';

const ForecastHeader = ({ forecast, narrow }) => {
  const today = forecast.daily.data[0];
  return (
    <header className={styles.forecastHeader}>
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
              <Temperature
                temperature={forecast.currently.apparentTemperature}
              />
            </p>
          </div>
        </div>
        <p className={styles.forecastText}>
          <strong className={styles.forecastSummary}>Today: </strong>
          {today.summary}
        </p>
        <SunStats
          sunriseTime={today.sunriseTime}
          sunsetTime={today.sunsetTime}
          moonPhase={today.moonPhase}
          timezone={today.timezone}
        />
      </div>
      <ForecastDayStats
        forecast={today}
        timezone={forecast.timezone}
        showSecondary
        narrow={narrow}
      />
    </header>
  );
};

ForecastHeader.propTypes = {
  forecast: PropTypes.object,
  narrow: PropTypes.bool
};

export default ForecastHeader;
