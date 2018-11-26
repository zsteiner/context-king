export default function getDay(date) {
  const dateOptions = {
    month: 'numeric',
    day: 'numeric'
  };

  const thisDate = new Date(date * 1000);
  const formatDate = thisDate.toLocaleDateString('en-US', dateOptions);
  return formatDate;
}
