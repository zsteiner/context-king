import React from 'react';
import PropTypes from 'prop-types';

import CurrentMeter from '../CurrentMeter/CurrentMeter';
import FlexRow from '../FlexRow/FlexRow';
import ForecastDayStats from '../ForecastDayStats/ForecastDayStats';
import SunStats from '../SunStats/SunStats';
import Temperature from '../Temperature/Temperature';
import TemperatureHighLow from '../TemperatureHighLow/TemperatureHighLow';
import WeatherIcon from '../WeatherIcon/WeatherIcon';

import styles from './ForecastHeader.module.scss';

function ForecastHeader({ forecast, narrow }) {
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
          <div className={styles.forecastConditionsSummary}>
            <h2>{forecast.currently.summary}</h2>
            <p className={styles.forecastText}>
              Feels like
              {' '}
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
        <FlexRow>
          <TemperatureHighLow
            temperatureHigh={today.temperatureHigh}
            temperatureHighTime={today.temperatureHighTime}
            temperatureLow={today.temperatureLow}
            temperatureLowTime={today.temperatureLowTime}
            forecast={forecast.timezone}
          />
          <SunStats
            sunriseTime={today.sunriseTime}
            sunsetTime={today.sunsetTime}
            moonPhase={today.moonPhase}
            timezone={today.timezone}
          />
        </FlexRow>
      </div>
      <ForecastDayStats
        forecast={today}
        timezone={forecast.timezone}
        showSecondary
        narrow={narrow}
      />
    </header>
  );
}

ForecastHeader.propTypes = {
  forecast: PropTypes.object,
  narrow: PropTypes.bool,
};

export default ForecastHeader;
