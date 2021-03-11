const makeUrl = (url, params) => {
  for (let param in params) {
    const paramName = param;
    const paramValue = params[param];

    url = url.replace(`:${paramName}`, paramValue);
  }

  return url;
}

export default makeUrl;
