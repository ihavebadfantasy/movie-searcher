import searchState from './state';
import {
  SEARCH_BY_FILETRS,
  SET_IS_SEARCHING,
  CLEAR_SEARCH_RESULTS,
  SET_RESULTS_CURRENT_PAGE,
  SET_RESULTS_TOTAL_CNT,
  SET_RESULTS_TOTAL_PAGES,
} from './types';

export const reducer = (state = searchState, action) => {
  switch (action.type) {
    case SEARCH_BY_FILETRS:
      return {...state, results: [...state.results, ...action.payload], isSearching: false};
    case CLEAR_SEARCH_RESULTS:
      return {...state, results: []};
    case SET_IS_SEARCHING:
      return {...state, isSearching: action.payload};
    case SET_RESULTS_TOTAL_CNT:
      return {...state, resultsTotalCnt: action.payload};
    case SET_RESULTS_TOTAL_PAGES:
      return {...state, resultsTotalPages: action.payload};
    case SET_RESULTS_CURRENT_PAGE:
      return {...state, resultsCurrentPage: action.payload};
    default:
      return state;
  }
}
