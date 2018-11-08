export default function colorValue(value) {
  let hueValue;

  const temps = {
    high: {
      temp: 80,
      hue: 12
    },
    medHigh: {
      temp: 60,
      hue: 29
    },
    medLow: {
      temp: 40,
      hue: 133
    },
    low: {
      temp: 30,
      hue: 209
    },
    exLow: {
      temp: 29,
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
