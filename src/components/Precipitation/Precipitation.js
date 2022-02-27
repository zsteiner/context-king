import React from 'react';
import PropTypes from 'prop-types';

import WeatherIcon from '../WeatherIcon/WeatherIcon';
import makePercent from '../../utils/makePercent';
import styles from './Precipitation.module.scss';

function Precipitation({ precipProbability, precipType }) {
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
        <>
          <WeatherIcon icon={icon} />
          {makePercent(precipProbability)}
        </>
      ) : null}
    </div>
  );
}

Precipitation.propTypes = {
  precipProbability: PropTypes.number,
  precipType: PropTypes.string,
};

export default Precipitation;
