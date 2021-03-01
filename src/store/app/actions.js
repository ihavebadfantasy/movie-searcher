import { LOAD_INITIAL_APP_DATA } from './types';
import { setLocation } from '../user/actions';
import { fetchMoviesGenres } from '../movies/actions';
import { fetchTvShowsGenres } from '../tvShows/actions';

export const loadInitialAppData = () => {
  return async (dispatch, getState) => {
    await dispatch(setLocation());
    await dispatch(fetchTvShowsGenres());
    await dispatch(fetchMoviesGenres());

    dispatch({
      type: LOAD_INITIAL_APP_DATA,
    });
  }
}
