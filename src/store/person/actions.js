import { FETCH_CURRENT_PERSON } from './types';
import { PEARSON_DETAILS_URL } from '../../api/tmdb/urls';
import { Api as TMDBApi } from '../../api/tmdb/Api';
import makeUrl from '../../helpers/makeUrl';
import reactor from '../../helpers/reactor/Reactor';
import { REDIRECT_TO_NOT_FOUND_PAGE } from '../../helpers/reactor/events';

export const fetchCurrentPerson = (id) => {
  return async (dispatch) => {
    const url = makeUrl(PEARSON_DETAILS_URL, { id });

    const res = await TMDBApi.$instance.get(url);

    let payload;

    if (res.status && res.status >= 300) {
      payload = null;
    } else {
      payload = res;
    }

    dispatch({
      type: FETCH_CURRENT_PERSON,
      payload,
    });

    if (!payload) {
      reactor.dispatchEvent(REDIRECT_TO_NOT_FOUND_PAGE);
    }
  }
}


