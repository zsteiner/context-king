import React from 'react';
import PropTypes from 'prop-types';

import ForecastDayStats from '../ForecastDayStats/ForecastDayStats';
import SunStats from '../SunStats/SunStats';
import Temperature from '../Temperature/Temperature';
import WeatherIcon from '../WeatherIcon/WeatherIcon';

import { ReactComponent as ArrowRight } from '../../assets/arrow-right.svg';

import styles from './ForecastHeader.module.scss';

const TimemachineHeader = ({ forecast, narrow }) => {
  const today = forecast.daily.data[0];
  return (
    <header className={styles.forecastHeader}>
      <div className={styles.forecastInfo}>
        <div className={styles.forecastConditions}>
          <WeatherIcon conditions={today.icon} className={styles.icon} />
          <div>
            <h2>{today.summary}</h2>
            <p className={styles.range}>
              <Temperature temperature={today.temperatureLow} />
              <ArrowRight className={`${styles.rangeIcon} svg-icon`} />
              <Temperature temperature={today.temperatureHigh} />
            </p>
          </div>
        </div>
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

TimemachineHeader.propTypes = {
  forecast: PropTypes.object,
  narrow: PropTypes.bool
};

export default TimemachineHeader;
