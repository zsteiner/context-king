import React from 'react';
import PropTypes from 'prop-types';

import styles from './WeatherIcon.module.scss';

const WeatherIcon = ({ conditions, alt, className }) => {
  return (
    <img
      src={`https://darksky.net/images/weather-icons/${conditions}.png`}
      alt={alt ? alt : conditions}
      className={`${styles.icon} ${className}`}
    />
  );
};

WeatherIcon.propTypes = {
  alt: PropTypes.string,
  className: PropTypes.string,
  conditions: PropTypes.string
};

export default WeatherIcon;
