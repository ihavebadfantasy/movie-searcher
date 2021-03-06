const generateArrayInRange = (from, to) => {
  const res = [];
  for (let i = from; i <= to; i++) {
    res.push(i);
  }

  return res;
}

export default generateArrayInRange;
