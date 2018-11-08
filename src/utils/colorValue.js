export default function colorValue(value) {
  let hueValue;

  const temps = {
    high: {
      temp: 79,
      hue: 12
    },
    medHigh: {
      temp: 59,
      hue: 29
    },
    medLow: {
      temp: 39,
      hue: 133
    },
    low: {
      temp: 29,
      hue: 209
    },
    exLow: {
      temp: 28,
      hue: 209
    }
  };

  switch (true) {
    case value >= temps.high.temp:
      hueValue = temps.high.hue;
      break;
    case value < temps.high.temp && value >= temps.medHigh.temp:
      hueValue = temps.medHigh.hue;
      break;
    case value < temps.medHigh.temp && value >= temps.medLow.temp:
      hueValue = temps.medLow.hue;
      break;
    case value < temps.medLow.temp && value >= temps.low.temp:
      hueValue = temps.low.hue;
      break;
    default:
      hueValue = temps.exLow.hue;
  }

  return hueValue;
}
