import axios from 'axios';
import setBackground from './setBackground';

export default function getBackground(search, updateBackgroundImage) {
  const unsplashAccessKey = process.env.REACT_APP_UNSPLASH;

  const api = `https://api.unsplash.com/photos/random?query=${search}&client_id=${unsplashAccessKey}&orientation=landscape`;

  axios
    .get(api)
    .then(response => {
      const data = response.data;

      localStorage.setItem('storedBackground', JSON.stringify(data));
      setBackground(data.urls.full, data.color);
      updateBackgroundImage(data);
    })
    .catch(err => {
      console.log('Error happened during fetching!', err);
    });
}
