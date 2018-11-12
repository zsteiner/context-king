import React from 'react';
import PropTypes from 'prop-types';

import Temperature from '../Temperature/Temperature';

import styles from './TemperatureHour.module.scss';

const TemperatureHour = ({ temperature, temperatureMax }) => {
  const position = (temperature / temperatureMax) * 100;

  return (
    <span className={styles.temp} style={{ left: `${position}%` }}>
      <Temperature temp={temperature} />
    </span>
  );
};

TemperatureHour.propTypes = {
  temperature: PropTypes.number,
  temperatureMax: PropTypes.number
};

export default TemperatureHour;
