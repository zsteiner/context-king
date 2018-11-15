import axios from 'axios';
import Color from 'color';

export default function getBackground(search) {
  const unsplashAccessKey =
    'da0c3c38dee4d331d700bdaa28239c63527295291b54765ff0612841fd9a8f5c';

  const api = `https://api.unsplash.com/photos/random?query=${search}&client_id=${unsplashAccessKey}&orientation=landscape`;

  let root = document.documentElement;

  axios
    .get(api)
    .then(response => {
      const data = response.data;
      const color = Color(data.color);
      const calcColor = color
        .mix(Color('white'), 0.8)
        .fade(0.12)
        .string();

      root.style.setProperty('--background-image', `url(${data.urls.full})`);
      root.style.setProperty('--background-color', calcColor);
      return data;
    })
    .catch(err => {
      console.log('Error happened during fetching!', err);
    });
}
