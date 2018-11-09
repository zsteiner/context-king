import React from 'react';
import PropTypes from 'prop-types';

import styles from './WeatherIcon.module.scss';

const WeatherIcon = ({ conditions, className }) => {
  return (
    <img
      src={`https://darksky.net/images/weather-icons/${conditions}.png`}
      alt={conditions}
      className={`${styles.icon} ${className}`}
    />
  );
};

WeatherIcon.propTypes = {
  className: PropTypes.string,
  conditions: PropTypes.string
};

export default WeatherIcon;
