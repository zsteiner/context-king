import colorValue from './colorValue';

export default function temperatureColors(temperatureHigh, temperatureLow) {
  let colorLow = 209;
  let colorHigh = 12;

  colorLow = colorValue(temperatureLow);
  colorHigh = colorValue(temperatureHigh);

  let root = document.documentElement;
  root.style.setProperty('--temp-low', `hsl(${colorLow}, 85%, 50%)`);
  root.style.setProperty('--temp-high', `hsl(${colorHigh}, 85%, 50%)`);
}
