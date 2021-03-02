import { Api as TMDBApi } from './Api';
import reactor from '../../helpers/reactor/Reactor';
import { STOP_CURRENT_MOVIE_FETCHING, STOP_CURRENT_TV_SHOW_FETCHING } from '../../helpers/reactor/events';

const fetchMediaData = async(url, config, page, withPostersOnly = false, all = false, media = [], loadingIsDiscarded = false) => {
  // TODO: add lazy loading, some data like similar, recommendations and so on loads too long and may not even be viewed by user
  if (loadingIsDiscarded) {
    return null;
  }

  const discardLoading = () => {
    loadingIsDiscarded = true;
  }

  reactor.addEventListener(STOP_CURRENT_MOVIE_FETCHING, discardLoading);
  reactor.addEventListener(STOP_CURRENT_TV_SHOW_FETCHING, discardLoading);

  if (page) {
    config.params.page = page;
  }

  const res = await TMDBApi.$instance.get(url, config);

  if (res.status >= 300 || !res.results.length) {
    reactor.removeEventListener(STOP_CURRENT_MOVIE_FETCHING, discardLoading);
    reactor.removeEventListener(STOP_CURRENT_TV_SHOW_FETCHING, discardLoading);
    return media;
  }

  let results = res.results;

  if (withPostersOnly) {
    results = results.filter((item) => {
      return item.poster_path;
    });
  }

  if (all) {
    reactor.removeEventListener(STOP_CURRENT_MOVIE_FETCHING, discardLoading);
    reactor.removeEventListener(STOP_CURRENT_TV_SHOW_FETCHING, discardLoading);
    return fetchMediaData(url, config, page + 1, true, true, [...media, ...results], loadingIsDiscarded);
  }

  reactor.removeEventListener(STOP_CURRENT_MOVIE_FETCHING, discardLoading);
  reactor.removeEventListener(STOP_CURRENT_TV_SHOW_FETCHING, discardLoading);

  return [...media, ...results];
}

export default fetchMediaData;
