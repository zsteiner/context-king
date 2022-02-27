import React from 'react';
import PropTypes from 'prop-types';

import Temperature from '../Temperature/Temperature';

import styles from './TemperatureRange.module.scss';

function TemperatureRange({
  temperatureHigh,
  temperatureLow,
  temperatureMax,
  temperatureMin,
}) {
  const overallRange = temperatureMax - temperatureMin;
  const tempRange = ((temperatureHigh - temperatureLow) / overallRange) * 100;
  const position = ((temperatureLow - temperatureMin) / overallRange) * 100;

  return (
    <div className={styles.tempRange}>
      <div className={styles.tempRangeBar} style={{ left: `${position}%` }}>
        <div className={styles.range} style={{ width: `${tempRange}%` }}>
          <Temperature
            temperature={temperatureLow}
            className={styles.rangeValue}
          />
          <Temperature
            temperature={temperatureHigh}
            className={styles.rangeValue}
          />
        </div>
      </div>
    </div>
  );
}

TemperatureRange.propTypes = {
  temperatureLow: PropTypes.number,
  temperatureHigh: PropTypes.number,
  temperatureMax: PropTypes.number,
  temperatureMin: PropTypes.number,
};

export default TemperatureRange;
