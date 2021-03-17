import { DateTime } from 'luxon';

const generateDatestring = (isoDate, lang = localStorage.getItem('i18nextLng')) => {
  console.log(lang);
  const releaseDate = DateTime.fromISO(isoDate, {locale: lang});
  let dayPrefix;

  switch (releaseDate.day) {
    case 1:
      dayPrefix = 'st';
      break;
    case 2:
      dayPrefix = 'nd';
      break;
    case 3:
      dayPrefix = 'rd';
      break;
    default:
      dayPrefix = 'th';
  }

  switch (lang) {
    case 'ru':
      return `${releaseDate.day}-е, ${releaseDate.monthLong}, ${releaseDate.year}`;
    case 'en':
      return `${releaseDate.day}${dayPrefix} of ${releaseDate.monthLong}, ${releaseDate.year}`
  }
}

export default generateDatestring;
