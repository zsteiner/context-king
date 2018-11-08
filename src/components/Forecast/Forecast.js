import React from 'react';

import { LocationContext } from '../../contexts/LocationContext';

import CurrentMeter from '../CurrentMeter/CurrentMeter';
import styles from './Forecast.module.scss';

const Forecast = () => {
  return (
    <LocationContext.Consumer>
      {context => (
        <section className={styles.forecast}>
          <CurrentMeter forecast={context.forecast} />
          <div className={styles.forecastInfo}>
            <h2 className={styles.forecastConditions}>
              {context.forecast.currently.summary}
            </h2>

            <p>
              <strong className={styles.forecastSummary}>This week: </strong>
              {context.forecast.daily.summary}
            </p>
          </div>
        </section>
      )}
    </LocationContext.Consumer>
  );
};

export default Forecast;
