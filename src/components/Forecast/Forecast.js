import React from 'react';

import { LocationContext } from '../../contexts/LocationContext';

import ForecastHeader from '../ForecastHeader/ForecastHeader';
import DailyForecast from '../DailyForecast/DailyForecast';
import HourlyForecast from '../HourlyForecast/HourlyForecast';
import Map from '../Map/Map';

import styles from './Forecast.module.scss';

const Forecast = () => {
  return (
    <LocationContext.Consumer>
      {context => (
        <section className={styles.forecast}>
          <ForecastHeader forecast={context.forecast} />
          <Map coordinates={context.coordinates} />
          <HourlyForecast hourly={context.forecast.hourly} />
          <DailyForecast daily={context.forecast.daily} />
        </section>
      )}
    </LocationContext.Consumer>
  );
};

export default Forecast;
