import searchState from './state';
import {
  SEARCH_BY_FILETRS,
  SET_IS_SEARCHING,
  CLEAR_SEARCH_RESULTS,
  SET_RESULTS_CURRENT_PAGE,
  SET_RESULTS_TOTAL_CNT,
  SET_RESULTS_TOTAL_PAGES,
  SET_GENRES_CHECKBOXES,
  SET_MIN_VOTE_COUNT_VALUE,
  SET_RATING_RADIOS,
  SET_SEARCH_TERM,
  SET_COUNTRIES_CHECKBOXES,
  SET_SEARCH_WAS_REQUESTED,
  SET_YEARS_CHECKBOXES,
  CLEAR_ALL_SEARCH_STORE,
  MULTI_SEARCH,
  SET_SEARCH_PAGE_SCROLL_POSITION,
} from './types';

export const reducer = (state = searchState, action) => {
  switch (action.type) {
    case SEARCH_BY_FILETRS:
      return {...state, results: [...state.results, ...action.payload], isSearching: false, searchWasRequested: true};
    case MULTI_SEARCH:
      return {...state, results: [...state.results, ...action.payload], isSearching: false, searchWasRequested: true};
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
    case SET_RATING_RADIOS:
      return {...state, ratingRadios: action.payload};
    case SET_SEARCH_TERM:
      return {...state, searchTerm: action.payload};
    case SET_MIN_VOTE_COUNT_VALUE:
      return {...state, minVoteCountValue: action.payload};
    case SET_GENRES_CHECKBOXES:
      return {...state, genresCheckboxes: action.payload};
    case SET_COUNTRIES_CHECKBOXES:
      return {...state, countriesCheckboxes: action.payload};
    case SET_SEARCH_WAS_REQUESTED:
      return {...state, searchWasRequested: action.payload};
    case SET_YEARS_CHECKBOXES:
      return {...state, yearsCheckboxes: action.payload};
    case CLEAR_ALL_SEARCH_STORE:
      return searchState;
    case SET_SEARCH_PAGE_SCROLL_POSITION:
      return {...state, searchPageScrollPosition: action.payload}
    default:
      return state;
  }
}
