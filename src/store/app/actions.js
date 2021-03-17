import { LOAD_INITIAL_APP_DATA } from './types';
import { FETCH_TMDB_COUNTRIES, FETCH_TMDB_JOBS, SET_THEME } from './types';
import { COUNTRIES, JOBS } from '../../api/tmdb/urls';
import { setLocation, setLanguage } from '../user/actions';
import { fetchMoviesGenres } from '../movies/actions';
import { fetchTvShowsGenres } from '../tvShows/actions';
import { Api as TMDBApi } from '../../api/tmdb/Api';

export const loadInitialAppData = () => {
  return async (dispatch) => {
    dispatch(setLanguage(localStorage.getItem('i18nextLng')));
    await dispatch(setLocation());
    await dispatch(fetchTvShowsGenres());
    await dispatch(fetchMoviesGenres());
    await dispatch(fetchTMDBJobs());

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

export const fetchTMDBJobs = () => {
  return async (dispatch) => {
    const res = await TMDBApi.$instance.get(JOBS);

    let payload;

    if (res.status && res.status >= 300) {
      payload = [];
    } else {
      payload = res;
    }

    dispatch({
      type: FETCH_TMDB_JOBS,
      payload,
    });
  }
}

export const setTheme = (theme) => {
  return {
    type: SET_THEME,
    payload: theme,
  }
}
