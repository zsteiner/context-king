import React from 'react';
import PropTypes from 'prop-types';

import styles from './Current.module.scss';

const Current = ({ temperature, temperatureHigh, temperatureLow }) => {
  return (
    <div className={styles.current}>
      {temperatureLow}
      {temperature}
      {temperatureHigh}
    </div>
  );
};

Current.propTypes = {
  temperature: PropTypes.number,
  temperatureHigh: PropTypes.number,
  temperatureLow: PropTypes.number
};

export default Current;
