const config = {
  darkskyKey: process.env.REACT_APP_DARK_SKY,
  mapboxKey: process.env.REACT_APP_MAPBOX,
  conditionList: [
    'apparentTemperature',
    'humidity',
    'dewPoint',
    'pressure',
    'precipProbability',
    'uvIndex',
    'visibility',
    'windSpeed'
  ]
};

export default config;
