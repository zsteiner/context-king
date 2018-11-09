export default function temperaturePosition(
  temperature,
  temperatureHigh,
  temperatureLow
) {
  if (temperature < temperatureLow) {
    temperature = temperatureLow;
  } else if (temperature > temperatureHigh) {
    temperature = temperatureHigh;
  }

  const currentRange = temperatureHigh - temperatureLow;
  const currentDifference = temperature - temperatureLow;

  let currentPercentage = currentDifference / currentRange;
  let currentAngle = currentPercentage * 180 - 180;

  let root = document.documentElement;
  root.style.setProperty('--current-position', `${currentAngle}deg`);
}
