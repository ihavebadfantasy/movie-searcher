import { Api as TMDBApi } from './Api';

const fetchMediaData = async(url, config, page, withPostersOnly = false, all = false, media = []) => {
  config.params.page = page;
  const res = await TMDBApi.$instance.get(url, config);

  if (res.status >= 300 || !res.results.length) {
    return media;
  }

  const results = res.results.filter((item) => {
    return item.poster_path;
  });

  if (all) {
    return fetchMediaData(url, config, page + 1, true, true, [...media, ...results]);
  }

  return [...media, ...results];
}

export default fetchMediaData;
