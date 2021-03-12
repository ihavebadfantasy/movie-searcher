import { DateTime } from 'luxon';

const getReleaseDateLte = (items) => {
  for (let item of items) {
    if (item.value === 'released') {
      if (!item.checked) {
        return null;
      }

      return DateTime.now().toISODate();
    }
  }
}

export default getReleaseDateLte;
