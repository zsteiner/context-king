import Color from 'color';

export default function setBackground(image, color) {
  let root = document.documentElement;
  const colorObj = Color(color);
  const calcColor = colorObj
    .mix(Color('white'), 0.9)
    .fade(0.06)
    .string();

  root.style.setProperty('--background-image', `url(${image})`);
  root.style.setProperty('--background-color', calcColor);
}
