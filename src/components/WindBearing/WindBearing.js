import React from 'react';
import PropTypes from 'prop-types';

import StatsItem from '../StatsItem/StatsItem';

import styles from './WindBearing.module.scss';

function WindBearing({ windBearing, windSpeed }) {
  let windDirection;

  switch (true) {
    case windBearing >= 45 && windBearing < 90:
      windDirection = 'North East';
      break;
    case windBearing >= 90 && windBearing < 135:
      windDirection = 'East';
      break;
    case windBearing >= 180 && windBearing < 225:
      windDirection = 'South';
      break;
    case windBearing >= 225 && windBearing < 270:
      windDirection = 'South East';
      break;
    case windBearing >= 270 && windBearing < 315:
      windDirection = 'West';
      break;
    case windBearing >= 315 && windBearing < 360:
      windDirection = 'North West';
      break;
    default:
      windDirection = 'North';
  }

  return (
    <StatsItem title={windDirection}>
      <strong>Wind</strong>
      {`${windSpeed} mph`}
      <span className={styles.wind}>
        <span
          style={{ transform: `rotate(${windBearing}deg)` }}
          className={styles.bearing}
        />
      </span>
    </StatsItem>
  );
}

WindBearing.propTypes = {
  windBearing: PropTypes.number,
  windSpeed: PropTypes.number,
};

export default WindBearing;
