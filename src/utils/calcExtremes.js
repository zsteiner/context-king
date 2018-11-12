export default function calcExtremes(extremes, temperatureMax, temperatureMin) {
  extremes.max = temperatureMax > extremes.max ? temperatureMax : extremes.max;

  extremes.min = temperatureMin < extremes.min ? temperatureMin : extremes.min;

  return extremes;
}
