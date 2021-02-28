const countDuration = (duration) => {
  if (duration < 60) {
    return `${duration} minutes`
  }

  const hours = (duration / 60);
  const hoursCnt = hours.toString().slice(0, hours.toString().indexOf('.'));
  const hoursTxt = hoursCnt > 1 ? 'hours' : 'hour'

  let minutes = duration;
  for (let i = 0; i < parseInt(hoursCnt); i++) {
    minutes -= 60;
  }

  if (minutes === 0) {
    return `${hoursCnt} ${hoursTxt}`
  }

  const minutesText = minutes > 1 ? 'minutes' : 'minute';

  return `${hoursCnt} ${hoursTxt} ${minutes} ${minutesText}`
}

export default countDuration;
