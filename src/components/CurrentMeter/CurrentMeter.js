import React from 'react';
import PropTypes from 'prop-types';

import Temperature from '../Temperature/Temperature';
import temperaturePosition from '../../utils/temperaturePosition';
import temperatureColor from '../../utils/temperatureColor';

import styles from './CurrentMeter.module.scss';

function CurrentMeter({ forecast }) {
  const today = forecast.daily.data[0];

  const { temperature } = forecast.currently;
  const { temperatureMin } = today;
  const { temperatureMax } = today;
  let { temperatureLow } = today;
  let { temperatureHigh } = today;

  if (temperature) {
    temperatureHigh = temperatureMax > temperatureHigh ? temperatureMax : temperatureMax;
    temperatureLow = temperatureMin < temperatureLow ? temperatureMin : temperatureLow;

    temperaturePosition(temperature, temperatureHigh, temperatureLow);
    temperatureColor(temperature, temperatureHigh, temperatureLow);
  }

  return (
    <div className={styles.currentContainer}>
      <div className={styles.current}>
        <div className={styles.currentTrack} />
        <span className={styles.currentLabel}>
          <Temperature temperature={temperatureLow} />
        </span>
        <span className={styles.currentTemperature}>
          <Temperature temperature={temperature} />
        </span>
        <span className={styles.currentLabel}>
          <Temperature temperature={temperatureHigh} />
        </span>
      </div>
    </div>
  );
}

CurrentMeter.propTypes = {
  forecast: PropTypes.object,
};

export default CurrentMeter;
