export default function conditions(cloudCover, precipProbability, precipType) {
  let condition;

  switch (true) {
    case cloudCover > 0 && cloudCover < 0.5 && precipProbability <= 0:
      condition = 'Partly Cloudy';
      break;
    case cloudCover > 0.5 && precipProbability <= 0:
      condition = 'Overcast';
      break;
    case precipType === 'rain':
      condition = 'Rain';
      break;
    case precipType === 'snow':
      condition = 'Snow';
      break;
    case precipType === 'sleet':
      condition = 'Sleet';
      break;
    default:
      condition = 'Clear';
  }

  return condition;
}
