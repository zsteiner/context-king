import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import makePercent from '../../utils/makePercent';

import StatsItem from '../StatsItem/StatsItem';
import Temperature from '../Temperature/Temperature';
import UVIndex from '../UVIndex/UVIndex';
import WindBearing from '../WindBearing/WindBearing';

import styles from './ForecastDayStats.module.scss';

function ForecastDayStats({ forecast, narrow }) {
  const statsClasses = classNames({
    [styles.stats]: true,
    [styles.statsNarrow]: narrow,
  });
  return (
    <div className={statsClasses}>
      <StatsItem label="Humidity" value={makePercent(forecast.humidity)} />
      <StatsItem
        label="Precipitation"
        value={makePercent(forecast.precipProbability)}
      />
      <StatsItem label="UV" value={<UVIndex uvIndex={forecast.uvIndex} />} />
      <StatsItem
        label="Dew Point"
        value={<Temperature temperature={forecast.dewPoint} />}
      />
      <StatsItem
        label="Ozone"
        value={forecast.ozone ? forecast.ozone : 'N/A'}
      />
      <StatsItem label="Pressures" value={`${forecast.pressure} mb`} />
      <StatsItem>
        <WindBearing
          windBearing={forecast.windBearing}
          windSpeed={forecast.windSpeed}
        />
      </StatsItem>
    </div>
  );
}

ForecastDayStats.propTypes = {
  forecast: PropTypes.object,
  narrow: PropTypes.bool,
};

export default ForecastDayStats;
