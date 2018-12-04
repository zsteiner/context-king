import React from 'react';
import PropTypes from 'prop-types';

import StatsItem from '../StatsItem/StatsItem';

import styles from './WindBearing.module.scss';

const WindBearing = ({ windBearing, windSpeed }) => {
  return (
    <StatsItem title="Wind">
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
};

WindBearing.propTypes = {
  windBearing: PropTypes.number,
  windSpeed: PropTypes.number
};

export default WindBearing;
