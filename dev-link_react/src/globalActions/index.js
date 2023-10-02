export function formatTimestampWithTimezone(timestamp) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = new Date(timestamp).toLocaleDateString(
    undefined,
    options
  );
  return formattedDate;
}
export function getTime(timestamp) {
  const dateTime = new Date(timestamp);
  const hours = dateTime.getHours();
  let minutes = dateTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  const formattedTime = ` ${hours}:${minutes}`;
  return formattedTime;
}
export function getDay(timestamp) {
  const dateTime = new Date(timestamp);
  const day = dateTime.toLocaleDateString('en-US', {
    weekday: 'long',
  });
  const formattedDay = `${day.slice(0, 3)}`;
  return formattedDay;
}
