export const toggleCheckbox = (checkboxes, value) => {
  return checkboxes.map((checkbox) => {
    let checkboxValue = checkbox.value;
    if (typeof checkbox.value === 'number') {
      checkboxValue = checkboxValue + '';
    }

    if (checkboxValue === value) {
      checkbox.checked = !checkbox.checked;
    }

    return checkbox;
  });
}
