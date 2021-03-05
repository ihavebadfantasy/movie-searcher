const mapItemsToQueryString = (items, targetKey) => {
  let res = '';

  items.forEach((item, index) => {
    if (index === items.length - 1) {
      res += item[targetKey];

      return;
    }

    res += `${item[targetKey]},`;
  });

  return res;
}

export default mapItemsToQueryString;
