export default function colorValue(value) {
  let calcValue;

  const temps = {
    high: 80,
    medHigh: 60,
    medLow: 40,
    low: 30
  };

  switch (true) {
    case value >= temps.high:
      calcValue = 12; // temp-high
      break;
    case value < temps.high && value >= temps.medHigh:
      calcValue = 29; // temp-med-high
      break;
    case value < temps.medHigh && value >= temps.medLow:
      calcValue = 133; // temp-med-low
      break;
    case value < temps.medLow && value >= temps.low:
      calcValue = 209; // temp-low
      break;
    default:
      calcValue = 192; // temp-ex-low
  }

  return calcValue;
}
