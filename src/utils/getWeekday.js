export default function getWeekday(time, timezone) {
  const date = new Date(time * 1000);
  const dateOptions = {
    weekday: 'long',
    timeZone: timezone
  };
  const formattedTime = date.toLocaleDateString('en-us', dateOptions);
  return formattedTime;
}
