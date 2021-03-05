import { MOVIES_URL, TV_SHOWS_URL } from '../../api/tmdb/urls';
import { SET_IS_SEARCHING, SEARCH_BY_FILETRS } from './types';
import { Api as TMDBApi } from '../../api/tmdb/Api';

export const searchByFilters = (params) => {
  return async (dispatch) => {
    dispatch(setIsSearching(true));

    const res = await TMDBApi.$instance.get(MOVIES_URL, {
      params
    });

    console.log(res);

    let payload;
    if (res.status && res.status >= 300) {
      payload = [];
    } else {
      payload = res.results;
    }

    dispatch({
      type: SEARCH_BY_FILETRS,
      payload
    });

  }
}

export const setIsSearching = (searchStatus) => {
  return {
    type: SET_IS_SEARCHING,
    payload: searchStatus,
  };
}

