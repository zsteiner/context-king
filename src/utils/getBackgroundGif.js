import axios from 'axios';
import config from '../config/config';

export default function getBackgroundGif(search) {
  const giphyKey = config.giphyKey;

  const api = `https://api.giphy.com/v1/gifs/random?tag=${search}&api_key=${giphyKey}`;

  let root = document.documentElement;

  axios
    .get(api)
    .then(response => {
      const data = response.data.data;
      root.style.setProperty(
        '--background-image',
        `url(${data.images.original.url})`
      );
    })
    .catch(err => {
      console.log('Error happened during fetching!', err);
    });
}
