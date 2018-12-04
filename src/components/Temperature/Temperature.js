import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './Temperature.module.scss';

const Temperature = ({ temperature, className }) => {
  const tempRounded = temperature ? Math.round(temperature) : 0;

  const tempClasses = classNames({
    [styles.temp]: true,
    [className]: className
  });

  return (
    <span className={tempClasses}>
      {tempRounded}
      <sup>&deg;</sup>
    </span>
  );
};

Temperature.propTypes = {
  className: PropTypes.string,
  temperature: PropTypes.number
};

export default Temperature;
