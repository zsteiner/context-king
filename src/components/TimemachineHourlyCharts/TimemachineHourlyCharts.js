import React from 'react';
import PropTypes from 'prop-types';

import Chart from '../../components/Chart/Chart';

const TimemachineHourlyCharts = ({ hourlyConditions, timezone }) => {
  return (
    <React.Fragment>
      <Chart
        data={hourlyConditions.apparentTemperature}
        title="Feels like"
        format="degrees"
      />
      <Chart
        data={hourlyConditions.precipProbability}
        title="Precipitation Probability"
        format="percent"
      />
      <Chart
        data={hourlyConditions.dewPoint}
        title="Dew Point"
        format="degrees"
      />
      <Chart
        data={hourlyConditions.humidity}
        title="Humidity"
        format="percent"
      />
      <Chart
        data={hourlyConditions.uvIndex}
        title="UV Index"
        format="decimal"
      />
      <Chart
        data={hourlyConditions.windSpeed}
        title="Wind Speed"
        format="mph"
      />
      <Chart
        data={hourlyConditions.pressure}
        title="Atmospheric Pressure"
        format="mb"
      />
      <Chart
        data={hourlyConditions.visibility}
        title="Visibility"
        format="mi"
      />
    </React.Fragment>
  );
};

TimemachineHourlyCharts.propTypes = {
  hourlyConditions: PropTypes.object,
  timezone: PropTypes.string
};

export default TimemachineHourlyCharts;
