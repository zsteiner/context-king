import React from 'react';

import { LocationContext } from '../contexts/LocationContext';

import ForecastHeader from '../components/ForecastHeader/ForecastHeader';
import DailyForecast from '../components/DailyForecast/DailyForecast';
import HourlyForecast from '../components/HourlyForecast/HourlyForecast';
import Map from '../components/Map/Map';
import Section from '../components/Section/Section';

function Forecast() {
  return (
    <LocationContext.Consumer>
      {(context) => (
        <>
          <ForecastHeader forecast={context.forecast} showMeter />
          <Section>
            <Map coordinates={context.coordinates} />
          </Section>
          <Section>
            <HourlyForecast
              hourly={context.forecast.hourly.data.slice(1, 25)}
              showTitle
              showTemperatures
              timezone={context.forecast.timezone}
            />
          </Section>
          <Section>
            <DailyForecast
              daily={context.forecast.daily}
              hourly={context.forecast.hourly.data}
              timezone={context.forecast.timezone}
            />
          </Section>
        </>
      )}
    </LocationContext.Consumer>
  );
}

export default Forecast;
