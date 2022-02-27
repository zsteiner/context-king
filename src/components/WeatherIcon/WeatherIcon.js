import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import mapIcon from '../../utils/mapIcon';

function WeatherIcon({ conditions, className, icon }) {
  const iconMapped = conditions ? mapIcon(conditions) : icon;

  const iconClasses = classNames({
    'svg-icon': true,
    [className]: className,
  });

  return (
    <svg className={iconClasses}>
      <use xlinkHref={`#${iconMapped}`} />
    </svg>
  );
}

WeatherIcon.propTypes = {
  className: PropTypes.string,
  conditions: PropTypes.string,
  icon: PropTypes.string,
};

export default WeatherIcon;
