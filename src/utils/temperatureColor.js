import colorValue from './colorValue';

export default function temperatureColors(
  temperature,
  temperatureHigh,
  temperatureLow
) {
  const colorLow = colorValue(temperatureLow);
  const colorHigh = colorValue(temperatureHigh);

  const markerColor = colorValue(temperature);

  let root = document.documentElement;
  root.style.setProperty('--temp-low', `hsl(${colorLow}, 85%, 50%)`);
  root.style.setProperty('--marker-color', `hsl(${markerColor}, 85%, 50%)`);
  root.style.setProperty('--temp-high', `hsl(${colorHigh}, 85%, 50%)`);
}
