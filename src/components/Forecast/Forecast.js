import React from 'react';

import { LocationContext } from '../../contexts/LocationContext';

import CurrentMeter from '../CurrentMeter/CurrentMeter';

const Forecast = () => {
  return (
    <LocationContext.Consumer>
      {context => [
        <p>{context.forecast.daily.summary}</p>,
        <CurrentMeter forecast={context.forecast} />
      ]}
    </LocationContext.Consumer>
  );
};

Forecast.contextType = LocationContext;

export default Forecast;
