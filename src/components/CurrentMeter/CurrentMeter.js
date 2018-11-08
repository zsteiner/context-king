import React from 'react';
import PropTypes from 'prop-types';

import temperaturePosition from '../../utils/temperaturePosition';
import temperatureColor from '../../utils/temperatureColor';

import styles from './CurrentMeter.module.scss';

const CurrentMeter = ({ forecast }) => {
  const today = forecast.daily.data[0];

  const temperature = forecast.currently.temperature;
  const temperatureMin = today.temperatureMin;
  const temperatureMax = today.temperatureMax;
  let temperatureLow = today.temperatureLow;
  let temperatureHigh = today.temperatureHigh;

  if (temperature) {
    temperatureHigh =
      temperatureMax > temperatureHigh ? temperatureMax : temperatureMax;
    temperatureLow =
      temperatureMin < temperatureLow ? temperatureMin : temperatureLow;

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

CurrentMeter.propTypes = {
  temperature: PropTypes.number,
  temperatureHigh: PropTypes.number,
  temperatureLow: PropTypes.number
};

export default CurrentMeter;
