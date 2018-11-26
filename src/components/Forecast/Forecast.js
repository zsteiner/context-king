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
          <div className={styles.forecastSection}>
            <Map coordinates={context.coordinates} />
          </div>
          <div className={styles.forecastSection}>
            <HourlyForecast
              hourly={context.forecast.hourly.data.slice(1, 25)}
              showTitle={true}
              showTemperatures={true}
            />
          </div>
          <div className={styles.forecastSection}>
            <DailyForecast
              daily={context.forecast.daily}
              hourly={context.forecast.hourly.data}
            />
          </div>
        </section>
      )}
    </LocationContext.Consumer>
  );
};

export default Forecast;
