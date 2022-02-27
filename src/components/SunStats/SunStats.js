import React from 'react';
import PropTypes from 'prop-types';

import getTime from '../../utils/getTime';

import StatsItem from '../StatsItem/StatsItem';
import MoonPhase from '../MoonPhase/MoonPhase';
import WeatherIcon from '../WeatherIcon/WeatherIcon';

import styles from './SunStats.module.scss';

function SunStats({
  sunriseTime, sunsetTime, moonPhase, timezone,
}) {
  return (
    <StatsItem>
      <span className={styles.sunItem}>
        <WeatherIcon icon="Sunrise" className={styles.sun} />
        {getTime(sunriseTime, timezone)}
      </span>
      <span className={styles.sunItem}>
        <WeatherIcon icon="Sunset" className={styles.sun} />
        {getTime(sunsetTime, timezone)}
      </span>
      <span className={styles.sunItem}>
        <MoonPhase moonPhase={moonPhase} />
      </span>
    </StatsItem>
  );
}

SunStats.propTypes = {
  sunriseTime: PropTypes.number,
  sunsetTime: PropTypes.number,
  moonPhase: PropTypes.number,
  timezone: PropTypes.string,
};

export default SunStats;
