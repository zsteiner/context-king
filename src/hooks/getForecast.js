import { useState } from 'react';

import jsonp from 'jsonp';

function getForecast(lat, lon) {
  const [forecast, fetchingForecast] = useState([], false);

  const apiDarkskyToken = '16eb53a912c674ef3028c1c421473d5e';

  const api = `https://api.darksky.net/forecast/${apiDarkskyToken}/${lat},${lon}?exclude=minutely`;

  this.setLoading();

  jsonp(api, null, (error, response) => {
    if (error) {
      console.error(error.message);
    } else {
      this.setState({
        forecast: response,
        forecast: false
      });
    }
  });

  return [forecast, fetchingForecast];
}

export default getForecast;
