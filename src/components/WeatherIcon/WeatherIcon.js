import React from 'react';
import PropTypes from 'prop-types';

import mapIcon from '../../utils/mapIcon';

const WeatherIcon = ({ conditions, className, icon }) => {
  const iconMapped = conditions ? mapIcon(conditions) : icon;

  return (
    <React.Fragment>
      <svg className={`${className} svg-icon`}>
        <use xlinkHref={`#${iconMapped}`} />
      </svg>
    </React.Fragment>
  );
};

WeatherIcon.propTypes = {
  className: PropTypes.string,
  conditions: PropTypes.string,
  icon: PropTypes.string
};

export default WeatherIcon;
