import moment from 'moment';

export default function updateDateString(updateDate) {
  const formatDate = new Date(updateDate);

  const timeOptions = {
    hour: 'numeric',
    minute: 'numeric'
  };
  const time = formatDate.toLocaleTimeString('en-US', timeOptions);
  let dateString;

  const currentDate = moment();
  const formatUpdateDate = moment(formatDate);
  const sinceUpdate = currentDate.diff(formatUpdateDate, 'minutes');

  switch (true) {
    case sinceUpdate < 5:
      dateString = 'Just Now';
      break;
    case sinceUpdate < 60:
      dateString = `${sinceUpdate} ${
        sinceUpdate === 1 ? 'minute' : 'minutes'
      } ago`;
      break;
    case sinceUpdate > 60 && sinceUpdate < 240:
      dateString = `${Math.round(sinceUpdate / 60)} ${
        sinceUpdate === 1 ? 'hour' : 'hours'
      } ago`;
      break;
    case sinceUpdate > 240 && sinceUpdate < 1440:
      dateString = `Today at ${time}`;
      break;
    default:
      dateString = `${formatDate.toLocaleDateString()} at ${time}`;
  }

  return dateString;
}
