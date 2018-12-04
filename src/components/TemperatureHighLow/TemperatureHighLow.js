import React from 'react';
import PropTypes from 'prop-types';

import getShortTime from '../../utils/getShortTime';

import { ReactComponent as ArrowRight } from '../../assets/arrow-right.svg';
import Temperature from '../Temperature/Temperature';

import styles from './TemperatureHighLow.module.scss';

const TemperatureHighLow = ({
  temperatureHigh,
  temperatureHighTime,
  temperatureLow,
  temperatureLowTime,
  timezone
}) => {
  return (
    <p className={styles.range}>
      <Temperature
        temperature={temperatureLow}
        className={styles.temperature}
      />
      at {getShortTime(temperatureLowTime, timezone)}
      <ArrowRight className={`${styles.rangeIcon} svg-icon`} />
      <Temperature
        temperature={temperatureHigh}
        className={styles.temperature}
      />
      at {getShortTime(temperatureHighTime, timezone)}
    </p>
  );
};

TemperatureHighLow.propTypes = {
  temperatureHigh: PropTypes.number,
  temperatureHighTime: PropTypes.number,
  temperatureLow: PropTypes.number,
  temperatureLowTime: PropTypes.number,
  timezone: PropTypes.string
};

export default TemperatureHighLow;
