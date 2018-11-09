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
  const overallRange = temperatureMax - temperatureMin;
  const tempRange = ((temperatureHigh - temperatureLow) / overallRange) * 100;
  const position = (temperatureHigh / temperatureMax) * 100 - 100;

  return (
    <div className={styles.tempRange}>
      <div className={styles.tempRangeBar} style={{ left: `${position}%` }}>
        <Temperature temp={temperatureLow} />
        <span className={styles.range} style={{ width: `${tempRange}%` }} />
        <Temperature temp={temperatureHigh} />
      </div>
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
