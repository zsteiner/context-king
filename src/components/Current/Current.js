import React from 'react';
import PropTypes from 'prop-types';

import temperaturePosition from '../../utils/temperaturePosition';
import temperatureColor from '../../utils/temperatureColor';

import styles from './Current.module.scss';

const Current = ({ temperature, temperatureHigh, temperatureLow }) => {
  if (temperature) {
    temperaturePosition(temperature, temperatureHigh, temperatureLow);
    temperatureColor(temperature, temperatureHigh, temperatureLow);
  }

  return (
    <div className={styles.currentContainer}>
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
    </div>
  );
};

Current.propTypes = {
  temperature: PropTypes.number,
  temperatureHigh: PropTypes.number,
  temperatureLow: PropTypes.number
};

export default Current;
