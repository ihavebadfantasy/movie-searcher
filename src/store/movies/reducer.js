import moviesState from './state';
import {
  FETCH_NEW_MOVIES,
  FETCH_POPULAR_MOVIES,
  FETCH_MOVIES_GENRES,
  FETCH_CURRENT_MOVIE
} from './types';

export const reducer = (state = moviesState, action) => {
  switch (action.type) {
    case FETCH_NEW_MOVIES:
      return {...state, new: action.payload};
    case FETCH_POPULAR_MOVIES:
      return {...state, popular: action.payload};
    case FETCH_MOVIES_GENRES:
      return {...state, genres: action.payload};
    case FETCH_CURRENT_MOVIE:
      return {...state, currentMovie: action.payload};
    default:
      return state;
  }
}
