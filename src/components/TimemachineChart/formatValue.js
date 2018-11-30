import makePercent from '../../utils/makePercent';

export default function formatValue(value, format) {
  let formatted;
  switch (format) {
    case 'percent':
      formatted = makePercent(value);
      break;
    case 'number':
      formatted = Math.round(value);
      break;
    case 'decimal':
      formatted = value.toFixed(2);
      break;
    default:
      formatted = value;
  }
  return formatted;
}
