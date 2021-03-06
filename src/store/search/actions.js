import { MOVIES_URL } from '../../api/tmdb/urls';
import {
  SEARCH_BY_FILETRS,
  SET_IS_SEARCHING,
  CLEAR_SEARCH_RESULTS,
  SET_RESULTS_CURRENT_PAGE,
  SET_RESULTS_TOTAL_CNT,
  SET_RESULTS_TOTAL_PAGES,
} from './types';
import { Api as TMDBApi } from '../../api/tmdb/Api';

export const searchByFilters = (params, overrideResults = false) => {
  return async (dispatch, getState) => {
    dispatch(setIsSearching(true));
    console.log(overrideResults);
    if (overrideResults) {
      dispatch(clearSearchResults());
    }

    const state = getState();
    const page = state.search.resultsCurrentPage;
    params.page = page;

    const res = await TMDBApi.$instance.get(MOVIES_URL, {
      params,
    });

    console.log(res);

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

