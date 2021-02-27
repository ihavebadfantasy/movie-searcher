import moviesState from './state';
import { FETCH_NEW_MOVIES, FETCH_POPULAR_MOVIES } from './types';

export const reducer = (state = moviesState, action) => {
  switch (action.type) {
    case FETCH_NEW_MOVIES:
      return {...state, new: action.payload};
    case FETCH_POPULAR_MOVIES:
      return {...state, popular: action.payload};
    default:
      return state;
  }
}
