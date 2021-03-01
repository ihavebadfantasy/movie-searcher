import { DateTime } from 'luxon';

const getDateColorClass = (targetDate) => {
  targetDate = DateTime.fromISO(targetDate);
  const dateNow = DateTime.now();

  return targetDate > dateNow ? 'is-disabled' : '';
}

export default getDateColorClass;
