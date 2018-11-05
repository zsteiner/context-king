import React from 'react';
import PropTypes from 'prop-types';

import styles from './Current.module.scss';

const Current = ({ temperature, temperatureHigh, temperatureLow }) => {
  const currentRange = temperatureHigh - temperatureLow;
  const currentDifference = temperature - temperatureLow;
  let currentPercentage = currentDifference / currentRange;
  const currentAngle = currentPercentage * 180 - 180;

  let root = document.documentElement;
  root.style.setProperty('--current-percentage', `${currentPercentage * 100}%`);
  root.style.setProperty('--current-position', `${currentAngle}deg`);

  return (
    <div className={styles.current}>
      <div className={styles.currentTrack} />
      <label className={styles.currentLabel}>
        {Math.round(temperatureLow)}
        <sup>&deg;</sup>
      </label>
      <span className={styles.currentTemperature}>
        {Math.round(temperature)}
        <sup>&deg;</sup>
      </span>
      <label className={styles.currentLabel}>
        {Math.round(temperatureHigh)}
        <sup>&deg;</sup>
      </label>
    </div>
  );
};

Current.propTypes = {
  temperature: PropTypes.number,
  temperatureHigh: PropTypes.number,
  temperatureLow: PropTypes.number
};

export default Current;
