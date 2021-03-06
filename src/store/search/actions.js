import { MOVIES_URL, MULTI_SEARCH_URL } from '../../api/tmdb/urls';
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
} from './types';
import { Api as TMDBApi } from '../../api/tmdb/Api';
import mapItemsToQueryString from '../../helpers/forms/mapItemsToQueryString';
import findSelectedItems from '../../helpers/forms/findSelectedItems';

export const multiSearch = (overrideResults = false) => {
  return async (dispatch, getState) => {
    dispatch(setIsSearching(true));
    dispatch(setSearchWasRequested(false));

    if (overrideResults) {
      dispatch(clearSearchResults());
    }

    const params = {};

    const state = getState();

    const page = state.search.resultsCurrentPage;
    const query = state.search.searchTerm;
    params.page = page;
    params.query = query;

    const res = await TMDBApi.$instance.get(MULTI_SEARCH_URL, {
      params,
    });

    let payload;
    if (res.status && res.status >= 300) {
      payload = [];
    } else {
      payload = res.results;
      dispatch(setResultsCurrentPage(res.page));
      dispatch(setResultsTotalCnt(res.total_results));
      dispatch(setResultsTotalPages(res.total_pages));
    }

    dispatch({
      type: MULTI_SEARCH,
      payload
    });
  }
}

export const searchByFilters = (overrideResults = false) => {
  return async (dispatch, getState) => {
    dispatch(setIsSearching(true));
    dispatch(setSearchWasRequested(false));

    if (overrideResults) {
      dispatch(clearSearchResults());
    }

    const params = {};

    const state = getState();

    const page = state.search.resultsCurrentPage;
    params.page = page;

    const selectedGenres = mapItemsToQueryString(findSelectedItems(state.search.genresCheckboxes, 'checked'), 'value');
    const selectedRating = mapItemsToQueryString(findSelectedItems(state.search.ratingRadios, 'checked'), 'value');
    const selectedYears = mapItemsToQueryString(findSelectedItems(state.search.yearsCheckboxes, 'checked'), 'value');

    if (selectedGenres.length > 0) {
      params['with_genres'] = selectedGenres;
    }

    if (selectedRating.length > 0) {
      params['vote_average.gte'] = selectedRating;
    }

    if (state.search.minVoteCountValue) {
      params['vote_count.gte'] = state.search.minVoteCountValue;
    }

    if (selectedYears.length > 0) {
      params['primary_release_year'] = selectedYears;
    }

    if (state.search.searchTerm) {
      // TODO: add search term handling
    }

    const res = await TMDBApi.$instance.get(MOVIES_URL, {
      params,
    });

    let payload;
    if (res.status && res.status >= 300) {
      payload = [];
    } else {
      payload = res.results;
      dispatch(setResultsCurrentPage(res.page));
      dispatch(setResultsTotalCnt(res.total_results));
      dispatch(setResultsTotalPages(res.total_pages));
    }

    dispatch({
      type: SEARCH_BY_FILETRS,
      payload
    });
  }
}

export const setIsSearching = (searchStatus) => {
  return {
    type: SET_IS_SEARCHING,
    payload: searchStatus,
  };
}

export const setResultsTotalPages = (totalPagesCnt) => {
  return {
    type: SET_RESULTS_TOTAL_PAGES,
    payload: totalPagesCnt,
  };
}

export const setResultsCurrentPage = (currentPage) => {
  return {
    type: SET_RESULTS_CURRENT_PAGE,
    payload: currentPage,
  };
}

export const setResultsTotalCnt = (totalCnt) => {
  return {
    type: SET_RESULTS_TOTAL_CNT,
    payload: totalCnt,
  };
}

export const clearSearchResults = () => {
  return {
    type: CLEAR_SEARCH_RESULTS,
  };
}

export const clearAllSearchStore = () => {
  console.log('in clear');
  return {
    type: CLEAR_ALL_SEARCH_STORE,
  };
}

export const setRatingRadios = (ratingRadios) => {
  return {
    type: SET_RATING_RADIOS,
    payload: ratingRadios,
  };
}

export const setSearchTerm = (searchTerm) => {
  return {
    type: SET_SEARCH_TERM,
    payload: searchTerm,
  };
}

export const setMinVoteCountValue = (minVoteCountValue) => {
  return {
    type: SET_MIN_VOTE_COUNT_VALUE,
    payload: minVoteCountValue,
  };
}

export const setGenresCheckboxes = (genresCheckboxes) => {
  return {
    type: SET_GENRES_CHECKBOXES,
    payload: genresCheckboxes,
  };
}

export const setCountriesCheckboxes = (countriesCheckboxes) => {
  return {
    type: SET_COUNTRIES_CHECKBOXES,
    payload: countriesCheckboxes,
  };
}

export const setYearsCheckboxes = (yearsCheckboxes) => {
  return {
    type: SET_YEARS_CHECKBOXES,
    payload: yearsCheckboxes,
  };
}

export const setSearchWasRequested = (searchStatus) => {
  return {
    type: SET_SEARCH_WAS_REQUESTED,
    payload: searchStatus,
  };
}

