export default function getWeekday(time, timezone) {
  const date = new Date(time * 1000);
  const dateOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    timeZone: timezone
  };
  const formattedTime = date.toLocaleDateString('en-us', dateOptions);
  return formattedTime;
}
