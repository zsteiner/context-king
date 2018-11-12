import React from 'react';

import { LocationContext } from '../../contexts/LocationContext';

import CurrentMeter from '../CurrentMeter/CurrentMeter';
import DailyForecast from '../DailyForecast/DailyForecast';
import HourlyForecast from '../HourlyForecast/HourlyForecast';
import Temperature from '../Temperature/Temperature';
import WeatherIcon from '../WeatherIcon/WeatherIcon';

import styles from './Forecast.module.scss';

const Forecast = () => {
  return (
    <LocationContext.Consumer>
      {context => (
        <section className={styles.forecast}>
          <header className={styles.forecastCurrent}>
            <CurrentMeter forecast={context.forecast} />
            <div className={styles.forecastInfo}>
              <div className={styles.forecastConditions}>
                <WeatherIcon
                  conditions={context.forecast.currently.icon}
                  className={styles.icon}
                />
                <div>
                  <h2>{context.forecast.currently.summary}</h2>
                  <p className={styles.forecastText}>
                    Feels like{' '}
                    <Temperature
                      temp={context.forecast.currently.apparentTemperature}
                    />
                  </p>
                </div>
              </div>

              <p className={styles.forecastText}>
                <strong className={styles.forecastSummary}>Today: </strong>
                {context.forecast.daily.data[0].summary}
              </p>
            </div>
          </header>
          <HourlyForecast hourly={context.forecast.hourly} />
          <DailyForecast daily={context.forecast.daily} />
        </section>
      )}
    </LocationContext.Consumer>
  );
};

export default Forecast;
