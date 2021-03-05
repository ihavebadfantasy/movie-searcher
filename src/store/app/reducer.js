import appState from './state';
import { LOAD_INITIAL_APP_DATA, FETCH_TMDB_COUNTRIES } from './types';

export const reducer = (state = appState, action) => {
  switch (action.type) {
    case LOAD_INITIAL_APP_DATA:
      return {...state, isInitialDataLoaded: true};
    case FETCH_TMDB_COUNTRIES:
      return {...state, tmdbCountries: action.payload}
    default:
      return state;
  }
}
