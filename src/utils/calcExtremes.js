export default function calcExtremes(extremes, temperatureMax, temperatureMin) {
  const newExtremes = extremes;
  newExtremes.max = temperatureMax > extremes.max ? temperatureMax : extremes.max;

  newExtremes.min = temperatureMin < extremes.min ? temperatureMin : extremes.min;

  return newExtremes;
}
