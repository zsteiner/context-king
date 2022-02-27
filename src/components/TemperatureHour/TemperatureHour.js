import React from 'react';
import PropTypes from 'prop-types';

import Temperature from '../Temperature/Temperature';

import styles from './TemperatureHour.module.scss';

function TemperatureHour({ temperature, temperatureMax, temperatureMin }) {
  const temperatureRange = temperatureMax - temperatureMin;
  const temperatureOffset = temperature - temperatureMin;
  const position = (temperatureOffset / temperatureRange) * 100;

  return (
    <span
      className={styles.temp}
      style={{ left: `${position}%`, bottom: `${position}%` }}
    >
      <Temperature temperature={temperature} />
    </span>
  );
}

TemperatureHour.propTypes = {
  temperature: PropTypes.number,
  temperatureMax: PropTypes.number,
  temperatureMin: PropTypes.number,
};

export default TemperatureHour;
