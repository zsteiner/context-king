import axios from 'axios';

export default function getBackground(search) {
  const unsplashAccessKey =
    'da0c3c38dee4d331d700bdaa28239c63527295291b54765ff0612841fd9a8f5c';

  const api = `https://api.unsplash.com/photos/random?query=${search}&client_id=${unsplashAccessKey}&orientation=landscape`;

  let root = document.documentElement;

  axios
    .get(api)
    .then(response => {
      const data = response.data;
      root.style.setProperty('--background-image', `url(${data.urls.full})`);
      root.style.setProperty('--background-color', data.color);
    })
    .catch(err => {
      console.log('Error happened during fetching!', err);
    });
}
