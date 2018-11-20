export default function conditions(cloudCover, precipIntensity, precipType) {
  let condition;
  const precip = 0.002;
  switch (true) {
    case cloudCover > 0 && !precipType:
      condition = 'Partly Cloudy';
      break;
    case cloudCover > 0.5 && !precipType:
      condition = 'Overcast';
      break;
    case cloudCover > 0 && precipType === 'rain' && precipIntensity > precip:
      condition = 'Rain';
      break;
    case cloudCover > 0 && precipType === 'snow' && precipIntensity > precip:
      condition = 'Snow';
      break;
    case cloudCover > 0 && precipType === 'sleet' && precipIntensity > precip:
      condition = 'Sleet';
      break;
    default:
      condition = 'Clear';
  }

  return condition;
}
