import { DateTime } from 'luxon';

const generateDatestring = (isoDate) => {
  const releaseDate = DateTime.fromISO(isoDate);
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

  return `${releaseDate.day}${dayPrefix} of ${releaseDate.monthLong}, ${releaseDate.year}`
}

export default generateDatestring;
