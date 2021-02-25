export const toggleSelectedRadio = (items, value) => {
  return items.map((item) => {
    if (item.value === value) {
      item.checked = true;
    } else {
      item.checked = false;
    }

    return item;
  });
}
