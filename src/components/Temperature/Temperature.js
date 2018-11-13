import React from 'react';
import PropTypes from 'prop-types';

import styles from './Temperature.module.scss';

const Temperature = ({ temp, className }) => {
  const tempRounded = temp ? Math.round(temp) : 0;
  return (
    <span className={`${styles.temp} ${className}`}>
      {tempRounded}
      <sup>&deg;</sup>
    </span>
  );
};

Temperature.propTypes = {
  className: PropTypes.string,
  temp: PropTypes.number
};

export default Temperature;
