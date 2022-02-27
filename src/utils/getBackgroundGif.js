import axios from 'axios';
import config from '../config/config';

export default function getBackgroundGif(search) {
  const { giphyKey } = config;

  const api = `https://api.giphy.com/v1/gifs/random?tag=${search}&api_key=${giphyKey}`;

  const root = document.documentElement;

  axios
    .get(api)
    .then((response) => {
      const { data } = response.data;
      root.style.setProperty(
        '--background-image',
        `url(${data.images.original.url})`,
      );
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error('Error happened during fetching!', err);
    });
}
