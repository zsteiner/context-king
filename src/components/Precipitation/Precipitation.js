import React from 'react';
import PropTypes from 'prop-types';

import makePercent from '../../utils/makePercent';

import WeatherIcon from '../WeatherIcon/WeatherIcon';

import styles from './Precipitation.module.scss';

const Precipitation = ({ precipProbability, precipType }) => {
  let icon;

  switch (precipType) {
    case 'snow':
      icon = 'CloudSnowAlt';
      break;
    case 'sleet':
      icon = 'CloudHail';
      break;
    default:
      icon = 'CloudRain';
  }

  return (
    <div className={styles.precipitation}>
      {precipProbability > 0.005 ? (
        <React.Fragment>
          <WeatherIcon icon={icon} />
          {makePercent(precipProbability)}
        </React.Fragment>
      ) : null}
    </div>
  );
};

Precipitation.propTypes = {
  precipProbability: PropTypes.number,
  precipType: PropTypes.string,
  temperature: PropTypes.number
};

export default Precipitation;
