import axios from 'axios';

export default function getBackgroundFlickr(lat, lon) {
  const flickrAccessKey = '74385ce67a6b86ae4d7423caf1f8088d';

  const api = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${flickrAccessKey}&lat=${lat}&lon=${lon}&format=json&nojsoncallback=1&accuracy=11&privacy_filter=1`;

  let root = document.documentElement;

  axios
    .get(api)
    .then(response => {
      const photo = response.data.photos.photo;
      const random = Math.floor(Math.random() * photo.length);
      const data = photo[random];
      const photoID = data.id;
      const farmID = data.farm;
      const serverID = data.server;
      const secret = data.secret;

      const imageSrc = `https://farm${farmID}.staticflickr.com/${serverID}/${photoID}_${secret}_b.jpg`;

      root.style.setProperty('--background-image', `url(${imageSrc})`);
    })
    .catch(err => {
      console.log('Error happened during fetching!', err);
    });
}
