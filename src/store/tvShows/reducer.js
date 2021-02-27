import tvShowsState from './state';
import { FETCH_NEW_TV_SHOWS, FETCH_POPULAR_TV_SHOWS } from './types';

export const reducer = (state = tvShowsState, action) => {
  switch (action.type) {
    case FETCH_NEW_TV_SHOWS:
      return {...state, new: action.payload};
    case FETCH_POPULAR_TV_SHOWS:
      return {...state, popular: action.payload};
    default:
      return state;
  }
}
