import { MOVIES_URL, MULTI_SEARCH_URL, TV_SHOWS_URL } from '../../api/tmdb/urls';
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
  SET_TOP_SCROLL_POSITION,
  SET_RELEASE_TYPES_CHECKBOXES,
  SET_SORT_TYPE,
  SET_SORT_ORDER,
  SET_PARAMS,
} from './types';
import { Api as TMDBApi } from '../../api/tmdb/Api';
import mapItemsToQueryString from '../../helpers/forms/mapItemsToQueryString';
import findSelectedItems from '../../helpers/forms/findSelectedItems';
import getReleaseDateLte from '../../helpers/forms/getReleaseDateLte';
import getReleaseDateGte from '../../helpers/forms/getReleaseDateGte';
import isObjectsEqual from '../../helpers/isObjectsEqual';
import { MOVIES, TV_SHOWS } from '../../config/searchByFiltersTypes';

export const multiSearch = (
  overrideResults = false,
  showLoader = false,
  scrollPageAfterResultsLoaded = false) => {

  return async (dispatch, getState) => {
    if (showLoader) {
      dispatch(setIsSearching(true));
    }

    dispatch(setSearchWasRequested(false));

    const params = {};

    const state = getState();

    params.page = state.search.resultsCurrentPage;
    params.query = state.search.searchTerm;
    params.region = state.user.location.countryCode;

    const oldParams = state.search.params;

    if (isObjectsEqual(oldParams, params)) {
      return;
    }

    dispatch(setParams(params));

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

    if (overrideResults) {
      dispatch(clearSearchResults());
    }

    dispatch({
      type: MULTI_SEARCH,
      payload,
    });

    if (scrollPageAfterResultsLoaded) {
      dispatch(scrollToSearchPageScrollPosition(true));
    }
  }
}

export const searchByFilters = (
  type,
  overrideResults = false,
  showLoader = false,
  scrollPageAfterResultsLoaded = false,
) => {
  return async (dispatch, getState) => {
    if (showLoader) {
      dispatch(setIsSearching(true));
    }

    dispatch(setSearchWasRequested(false));

    const params = {};

    const state = getState();

    const page = state.search.resultsCurrentPage;
    params.page = page;

    const selectedGenres = mapItemsToQueryString(findSelectedItems(state.search.genresCheckboxes, 'checked'), 'value');
    const selectedRating = mapItemsToQueryString(findSelectedItems(state.search.ratingRadios, 'checked'), 'value');
    const selectedYears = mapItemsToQueryString(findSelectedItems(state.search.yearsCheckboxes, 'checked'), 'value');
    const lteReleaseDate = getReleaseDateLte(state.search.releaseTypesCheckboxes);
    const gteReleaseDate = getReleaseDateGte(state.search.releaseTypesCheckboxes);

    if (selectedGenres.length > 0) {
      params['with_genres'] = selectedGenres;
    }

    if (selectedRating.length > 0) {
      params['vote_average.gte'] = selectedRating;
    }

    if (state.search.minVoteCountValue) {
      params['vote_count.gte'] = state.search.minVoteCountValue;
    }

    if (lteReleaseDate) {
      switch (type) {
        case MOVIES:
          params['primary_release_date.lte'] = lteReleaseDate;
          break;
        case TV_SHOWS:
          params['first_air_date.lte'] = lteReleaseDate;
          break;
      }
    }

    if (gteReleaseDate) {
      switch (type) {
        case MOVIES:
          params['primary_release_date.gte'] = gteReleaseDate;
          break;
        case TV_SHOWS:
          params['first_air_date.gte'] = gteReleaseDate;
          break;
      }
    }

    if (lteReleaseDate && gteReleaseDate) {
      delete params['primary_release_date.lte'];
      delete params['primary_release_date.gte'];
      delete params['first_air_date.lte'];
      delete params['first_air_date.gte'];
    }

    if (selectedYears.length > 0) {
      switch (type) {
        case MOVIES:
          params['primary_release_year'] = selectedYears;
          break;
        case TV_SHOWS:
          params['first_air_date_year'] = selectedYears;
          break;
      }
    }

    params['sort_by'] = `${state.search.sortType}.${state.search.sortOrder}`;

    const oldParams = state.search.params;

    if (isObjectsEqual(oldParams, params)) {
      return;
    }

    dispatch(setParams(params));

    let url;

    switch (type) {
      case MOVIES:
        url = MOVIES_URL;
        break;
      case TV_SHOWS:
        url = TV_SHOWS_URL;
        break;
    }

    const res = await TMDBApi.$instance.get(url, {
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

    if (overrideResults) {
      dispatch(clearSearchResults());
    }

    dispatch({
      type: SEARCH_BY_FILETRS,
      payload
    });

    if (scrollPageAfterResultsLoaded) {
      dispatch(scrollToSearchPageScrollPosition(true));
    }
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

export const setReleaseTypesCheckboxes = (releaseTypeCheckboxes) => {
  return {
    type: SET_RELEASE_TYPES_CHECKBOXES,
    payload: releaseTypeCheckboxes,
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

export const setSortType = (sortType) => {
  return {
    type: SET_SORT_TYPE,
    payload: sortType,
  };
}

export const setSortOrder = (sortOrder) => {
  return {
    type: SET_SORT_ORDER,
    payload: sortOrder,
  };
}

export const setParams = (params) => {
  return {
    type: SET_PARAMS,
    payload: params,
  };
}

export const setSearchPageScrollPosition = (scrollPosition) => {
  return {
    type: SET_SEARCH_PAGE_SCROLL_POSITION,
    payload: scrollPosition,
  };
}

export const setTopScrollPosition = (scrollPosition) => {
  return {
    type: SET_TOP_SCROLL_POSITION,
    payload: scrollPosition,
  };
}

export const scrollToSearchPageScrollPosition = (isSmooth = false) => {
  return (dispatch, getState) => {
    const state = getState();
    const y = state.search.searchPageScrollPosition;

    window.scrollTo({
      top: y,
      behavior: isSmooth ? 'smooth' :'auto',
    });
  }
}

