import colorValue from './colorValue';

export default function temperatureColors(
  temperature,
  temperatureHigh,
  temperatureLow
) {
  const colorLow = colorValue(temperatureLow);
  const colorHigh = colorValue(temperatureHigh);

  let markerColor = 'transparent';

  if (temperature >= temperatureHigh - 1) {
    markerColor = `hsl(${colorValue(temperatureHigh)}, 85%, 50%)`;
  } else if (temperature <= temperatureLow + 1) {
    markerColor = `hsl(${colorValue(temperatureHigh)}, 85%, 50%)`;
  }

  let root = document.documentElement;
  root.style.setProperty('--temp-low', `hsl(${colorLow}, 85%, 50%)`);
  root.style.setProperty('--marker-color', markerColor);
  root.style.setProperty('--temp-high', `hsl(${colorHigh}, 85%, 50%)`);
}
