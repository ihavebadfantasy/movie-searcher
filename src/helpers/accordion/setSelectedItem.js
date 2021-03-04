const setSelectedItem = (items, setItems, id) => {
  const updatedItems = items.map((item) => {
    if (item.id === id) {
      item.selected = !item.selected;
    } else {
      item.selected = false;
    }

    return item;
  });

  setItems(updatedItems);
}

export default setSelectedItem;
