import searchState from './state';
import { SEARCH_BY_FILETRS, SET_IS_SEARCHING, CLEAR_SEARCH_RESULTS } from './types';

export const reducer = (state = searchState, action) => {
  switch (action.type) {
    case SEARCH_BY_FILETRS:
      return {...state, results: action.payload, isSearching: false};
    case CLEAR_SEARCH_RESULTS:
      return {...state, results: []};
    case SET_IS_SEARCHING:
      return {...state, isSearching: action.payload};
    default:
      return state;
  }
}
