export default function temperaturePosition(
  temperature,
  temperatureHigh,
  temperatureLow,
) {
  let newTemperature = temperature;

  if (newTemperature < temperatureLow) {
    newTemperature = temperatureLow;
  } else if (temperature > temperatureHigh) {
    newTemperature = temperatureHigh;
  }

  const currentRange = temperatureHigh - temperatureLow;
  const currentDifference = newTemperature - temperatureLow;
  const currentPercentage = currentDifference / currentRange;
  const currentAngle = currentPercentage * 180 - 180;
  const root = document.documentElement;

  root.style.setProperty('--current-position', `${currentAngle}deg`);
}
