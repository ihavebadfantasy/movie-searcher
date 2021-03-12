import { DateTime } from 'luxon';

const getReleaseDateGte = (items) => {
  for (let item of items) {
    if (item.value === 'featured') {
      if (!item.checked) {
        return null;
      }

      const now = DateTime.now();
      const res = now.plus({ days: 1 }).toISODate();

      return res;
    }
  }
}

export default getReleaseDateGte;
