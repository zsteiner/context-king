import colorValue from './colorValue';

function hueCalc(temp) {
  return temp > 28 ? '50%' : '80%';
}

export default function temperatureColors(
  temperature,
  temperatureHigh,
  temperatureLow
) {
  const hueLow = colorValue(temperatureLow);
  const colorLow = `hsl(${hueLow}, 85%, ${hueCalc(temperatureLow)})`;
  const hueHigh = colorValue(temperatureHigh);
  const colorHigh = `hsl(${hueHigh}, 85%, ${hueCalc(temperatureHigh)})`;

  let markerColor = 'transparent';

  if (temperature >= temperatureHigh - 1) {
    markerColor = colorLow;
  } else if (temperature <= temperatureLow + 1) {
    markerColor = colorHigh;
  }

  let root = document.documentElement;
  root.style.setProperty('--temp-low', colorLow);
  root.style.setProperty('--marker-color', markerColor);
  root.style.setProperty('--temp-high', colorHigh);
}
