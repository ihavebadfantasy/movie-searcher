// TODO: remove to i18n

const trans = {
  en: {
    mins: 'minutes',
    min: 'minute',
    hour: 'hour',
    hours: 'hours',
  },
  ru: {
    mins: 'минут',
    min: 'минута',
    hour: 'час',
    hours: 'часов',
  }
}

const countDuration = (duration, lang = localStorage.getItem('i18nextLng')) => {
  if (duration < 60) {
    return `${duration} ${trans[lang].mins}`
  }

  const hours = (duration / 60);
  const hoursCnt = hours.toString().slice(0, hours.toString().indexOf('.'));
  const hoursTxt = hoursCnt > 1 ? trans[lang].hours : trans[lang].hour;

  let minutes = duration;
  for (let i = 0; i < parseInt(hoursCnt); i++) {
    minutes -= 60;
  }

  if (minutes === 0) {
    return `${hoursCnt} ${hoursTxt}`
  }

  const minutesText = minutes > 1 ? trans[lang].mins : trans[lang].min;

  return `${hoursCnt} ${hoursTxt} ${minutes} ${minutesText}`
}

export default countDuration;
