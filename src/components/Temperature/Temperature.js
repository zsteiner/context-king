import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './Temperature.module.scss';

const Temperature = ({ temp, className }) => {
  const tempRounded = temp ? Math.round(temp) : 0;

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
  temp: PropTypes.number
};

export default Temperature;
