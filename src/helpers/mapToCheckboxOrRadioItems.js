const mapToCheckboxOrRadioItems = (arr) => {
  return arr.map((item) => {
    return {
      value: item.toString(),
      label: item.toString(),
      checked: false,
    };
  })
};

export default mapToCheckboxOrRadioItems;
