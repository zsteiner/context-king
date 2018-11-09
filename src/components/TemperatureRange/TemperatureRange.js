import React from 'react';
import PropTypes from 'prop-types';

import Temperature from '../Temperature/Temperature';

import styles from './TemperatureRange.module.scss';

const TemperatureRange = ({
  temperatureHigh,
  temperatureLow,
  temperatureMax,
  temperatureMin
}) => {
  const tempRange = temperatureHigh - temperatureLow;

  return (
    <div className={styles.tempRange}>
      <span className={styles.tempHigh}>
        <Temperature temp={temperatureLow} />
      </span>
      <span className={styles.range} width={`${tempRange}rem`} />
      <span className={styles.tempHigh}>
        <Temperature temp={temperatureHigh} />
      </span>
    </div>
  );
};

TemperatureRange.propTypes = {
  temperatureLow: PropTypes.number,
  temperatureHigh: PropTypes.number,
  temperatureMax: PropTypes.number,
  temperatureMin: PropTypes.number
};

export default TemperatureRange;
