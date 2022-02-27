const config = {
  darkskyKey: process.env.REACT_APP_DARK_SKY,
  mapboxKey: process.env.REACT_APP_MAPBOX,
  flickrKey: process.env.REACT_APP_FLICKR,
  giphyKey: process.env.REACT_APP_GIPHY,
  conditionList: [
    'apparentTemperature',
    'humidity',
    'dewPoint',
    'pressure',
    'precipProbability',
    'uvIndex',
    'visibility',
    'windSpeed',
  ],
};

export default config;
