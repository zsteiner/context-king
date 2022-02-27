export default function getDay(date, timezone) {
  const dateOptions = {
    month: 'numeric',
    day: 'numeric',
    timeZone: timezone,
  };

  const thisDate = new Date(date * 1000);
  const formatDate = thisDate.toLocaleDateString('en-US', dateOptions);
  return formatDate;
}
