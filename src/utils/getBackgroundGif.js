import axios from 'axios';

export default function getBackgroundGif(search) {
  const giphyAccessKey = 'yBMBCs3nUSiT9uEIygbSfchXGamjM9gv';

  const api = `https://api.giphy.com/v1/gifs/random?tag=${search}&api_key=${giphyAccessKey}`;

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
