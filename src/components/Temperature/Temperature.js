import React from 'react';
import PropTypes from 'prop-types';

import styles from './Temperature.module.scss';

const Temperature = ({ temp }) => {
  const tempRounded = temp ? Math.round(temp) : 0;
  return (
    <span className={styles.temp}>
      {tempRounded}
      <sup>&deg;</sup>
    </span>
  );
};

Temperature.propTypes = {
  temp: PropTypes.number
};

export default Temperature;
