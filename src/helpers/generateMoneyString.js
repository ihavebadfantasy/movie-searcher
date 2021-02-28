const currency = '$'

const generateMoneyString = (amount) => {
  amount = amount.toString().split('').reverse().join('');

  let res = [];
  while (amount.length) {
    const item = amount.slice(0, 3).split('').reverse().join('');
    res.push(item);
    amount = amount.slice(3);
  }

  res = res.reverse().join(',');

  return `${res}${currency}`;
}

export default generateMoneyString;
