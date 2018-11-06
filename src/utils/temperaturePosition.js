export default function temperaturePosition(
  temperature,
  temperatureHigh,
  temperatureLow
) {
  const currentRange = temperatureHigh - temperatureLow;
  const currentDifference = temperature - temperatureLow;
  let currentPercentage = currentDifference / currentRange;
  const currentAngle = currentPercentage * 180 - 180;

  let root = document.documentElement;
  root.style.setProperty('--current-position', `${currentAngle}deg`);
}
