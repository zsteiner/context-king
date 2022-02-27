import React from 'react';
import PropTypes from 'prop-types';

import ForecastDayStats from '../ForecastDayStats/ForecastDayStats';
import SunStats from '../SunStats/SunStats';
import TemperatureHighLow from '../TemperatureHighLow/TemperatureHighLow';
import WeatherIcon from '../WeatherIcon/WeatherIcon';

import styles from './ForecastHeader.module.scss';

function TimemachineHeader({ forecast, narrow }) {
  const today = forecast.daily.data[0];
  return (
    <header className={styles.forecastHeader}>
      <div className={styles.forecastInfo}>
        <div className={styles.forecastConditions}>
          <WeatherIcon conditions={today.icon} className={styles.icon} />
          <div className={styles.forecastConditionsSummary}>
            <h2>{today.summary}</h2>
          </div>
        </div>
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

TimemachineHeader.propTypes = {
  forecast: PropTypes.object,
  narrow: PropTypes.bool,
};

export default TimemachineHeader;
