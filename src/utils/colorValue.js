export default function colorValue(value) {
  let calcValue;

  if (value >= 80) {
    calcValue = 12; // temp-high
  } else if (value < 80 && value >= 65) {
    calcValue = 29; // temp-med-high
  } else if (value < 65 && value >= 40) {
    calcValue = 133; // temp-med-low
  } else if (value < 40 && value >= 32) {
    calcValue = 209; // temp-low
  } else {
    calcValue = 192; // temp-ex-low
  }

  return calcValue;
}
