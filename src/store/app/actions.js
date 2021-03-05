import { LOAD_INITIAL_APP_DATA } from './types';
import { FETCH_TMDB_COUNTRIES } from './types';
import { COUNTRIES } from '../../api/tmdb/urls';
import { setLocation } from '../user/actions';
import { fetchMoviesGenres } from '../movies/actions';
import { fetchTvShowsGenres } from '../tvShows/actions';
import { Api as TMDBApi } from '../../api/tmdb/Api';

export const loadInitialAppData = () => {
  return async (dispatch) => {
    await dispatch(setLocation());
    await dispatch(fetchTvShowsGenres());
    await dispatch(fetchMoviesGenres());

    dispatch({
      type: LOAD_INITIAL_APP_DATA,
    });
  }
}

export const fetchTMDBCountries = () => {
  return async (dispatch) => {
    const res = await TMDBApi.$instance.get(COUNTRIES);

    let payload;

    if (res.status && res.status >= 300) {
      payload = [];
    } else {
      payload = res;
    }

    dispatch({
      type: FETCH_TMDB_COUNTRIES,
      payload,
    });
  }
}
