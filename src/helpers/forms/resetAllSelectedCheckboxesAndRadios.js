const resetAllSelectedCheckboxesAndRadios = (items) => {
  return items.map((item) => {
    item.checked = false;

    return item;
  });
}

export default resetAllSelectedCheckboxesAndRadios;
