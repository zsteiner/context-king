export default function temperaturePosition(
  temperature,
  temperatureHigh,
  temperatureLow,
) {
  if (temperature < temperatureLow) {
    temperature = temperatureLow;
  } else if (temperature > temperatureHigh) {
    temperature = temperatureHigh;
  }

  const currentRange = temperatureHigh - temperatureLow;
  const currentDifference = temperature - temperatureLow;

  const currentPercentage = currentDifference / currentRange;
  const currentAngle = currentPercentage * 180 - 180;

  const root = document.documentElement;
  root.style.setProperty('--current-position', `${currentAngle}deg`);
}
