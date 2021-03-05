const findSelectedItems = (items, testKey) => {
  return items.filter((item) => {
    return item[testKey];
  })
}

export default findSelectedItems;
