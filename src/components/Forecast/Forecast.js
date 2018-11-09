import React from 'react';

import { LocationContext } from '../../contexts/LocationContext';

import CurrentMeter from '../CurrentMeter/CurrentMeter';
import DailyForecast from '../DailyForecast/DailyForecast';

import styles from './Forecast.module.scss';
import WeatherIcon from '../WeatherIcon/WeatherIcon';

const Forecast = () => {
  return (
    <LocationContext.Consumer>
      {context => (
        <section className={styles.forecast}>
          <header className={styles.forecastCurrent}>
            <CurrentMeter forecast={context.forecast} />
            <div className={styles.forecastInfo}>
              <h2 className={styles.forecastConditions}>
                <WeatherIcon
                  conditions={context.forecast.currently.icon}
                  className={styles.icon}
                />
                {context.forecast.currently.summary}
              </h2>

              <p>
                <strong className={styles.forecastSummary}>This week: </strong>
                {context.forecast.daily.summary}
              </p>
            </div>
          </header>
          <DailyForecast daily={context.forecast.daily} />
        </section>
      )}
    </LocationContext.Consumer>
  );
};

export default Forecast;
