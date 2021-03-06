import appState from './state';
import {
  LOAD_INITIAL_APP_DATA,
  FETCH_TMDB_COUNTRIES,
  FETCH_TMDB_JOBS,
  SET_THEME,
} from './types';

export const reducer = (state = appState, action) => {
  switch (action.type) {
    case FETCH_TMDB_JOBS:
      return {...state, tmdbJobs: action.payload};
    case SET_THEME:
      return {...state, theme: action.payload};
    case LOAD_INITIAL_APP_DATA:
      return {...state, isInitialDataLoaded: true};
    case FETCH_TMDB_COUNTRIES:
      return {...state, tmdbCountries: action.payload}
    default:
      return state;
  }
}
