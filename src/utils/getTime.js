export default function getTime(time, timezone) {
  const date = new Date(time * 1000);
  const dateOptions = {
    hour: 'numeric',
    minute: 'numeric',
    timeZone: timezone
  };
  const formattedTime = date.toLocaleTimeString('en-us', dateOptions);
  return formattedTime;
}
