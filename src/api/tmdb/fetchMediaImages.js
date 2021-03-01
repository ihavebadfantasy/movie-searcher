import { Api as TMDBApi } from './Api';

const fetchMediaImages = async (url) => {
  const res = await TMDBApi.$instance.get(url);

  if (res.status && res.status >= 300) {
    return null;
  }

  return res.posters;
}

export default fetchMediaImages;
