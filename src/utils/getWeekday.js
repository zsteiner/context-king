export default function getWeekday(time, timezone) {
  const date = new Date(time * 1000);
  const dateOptions = {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    timeZone: timezone,
  };
  const formattedTime = date.toLocaleDateString('en-us', dateOptions);
  return formattedTime;
}
