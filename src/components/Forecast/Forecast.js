import React from 'react';

import { LocationContext } from '../../contexts/LocationContext';

import CurrentMeter from '../CurrentMeter/CurrentMeter';
import styles from './Forecast.module.scss';

const Forecast = () => {
  return (
    <LocationContext.Consumer>
      {context => (
        <section className={styles.forecast}>
          <p>{context.forecast.currently.summary}</p>
          <p>{context.forecast.daily.summary}</p>
          <CurrentMeter forecast={context.forecast} />
        </section>
      )}
    </LocationContext.Consumer>
  );
};

export default Forecast;
