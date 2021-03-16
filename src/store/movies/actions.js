import { DateTime } from 'luxon';
import {
  MOVIES_URL,
  MOVIES_GENRES_URL,
  MOVIE_DETAILS,
  MOVIES_IMAGES,
  MOVIES_RECOMMENDATIONS,
  MOVIES_REVIEWS,
  MOVIES_SIMILAR,
} from '../../api/tmdb/urls';
import {
  FETCH_NEW_MOVIES,
  FETCH_POPULAR_MOVIES,
  FETCH_MOVIES_GENRES,
  FETCH_CURRENT_MOVIE,
  CLEAR_CURRENT_MOVIE,
  FETCH_CURRENT_MOVIE_RECOMMENDATIONS,
  FETCH_CURRENT_MOVIE_SIMILAR,
  CLEAR_POPULAR_MOVIES,
  CLEAR_NEW_MOVIES,
} from './types';
import fetchMediaData from '../../api/tmdb/fetchMediaData';
import { Api as TMDBApi } from '../../api/tmdb/Api';
import makeUrl from '../../helpers/makeUrl';
import fetchMediaImages from '../../api/tmdb/fetchMediaImages';
import reactor from '../../helpers/reactor/Reactor';
import { STOP_CURRENT_MOVIE_FETCHING, REDIRECT_TO_NOT_FOUND_PAGE } from '../../helpers/reactor/events';

export const fetchNewMovies = (page = 'all', overrideResults = false) => {
  return async (dispatch, getState) => {
    if (overrideResults) {
      dispatch(clearNewMovies());
    }

    const state = getState();

    const now = DateTime.now();
    const maxReleaseDate = now.toISODate();
    const minReleaseDate = now.minus({ months: 1 }).toISODate();

    const config = {
      params: {
        'primary_release_date.lte': maxReleaseDate,
        'primary_release_date.gte': minReleaseDate,
        'region': state.user.location.countryCode,
        'sort_by': 'primary_release_date.desc',
        page,
      }
    };

    let movies;

    if (page === 'all') {
      movies = await fetchMediaData(MOVIES_URL, config, 1, true, true);
    } else {
      movies = await fetchMediaData(MOVIES_URL, config, page, true);
    }

    dispatch({
      type: FETCH_NEW_MOVIES,
      payload: movies,
    });
  }
}

export const fetchPopularMovies = (page = 'all', overrideResults = false) => {
  return async (dispatch) => {
    if (overrideResults) {
      dispatch(clearPopularMovies());
    }

    const config = {
      params: {
        'vote_count.gte': 1000,
        'vote_average.gte': 8,
        'sort_by': 'vote_average.desc',
      }
    };
    let movies;

    if (page === 'all') {
      movies = await fetchMediaData(MOVIES_URL, config, 1, true, true);
    } else {
      movies = await fetchMediaData(MOVIES_URL, config, page, true);
    }

    dispatch({
      type: FETCH_POPULAR_MOVIES,
      payload: movies,
    });
  }
}

export const fetchMoviesGenres = () => {
  return async (dispatch) => {
    const res = await TMDBApi.$instance.get(MOVIES_GENRES_URL);

    let payload = [];
    if (res.genres) {
      payload = res.genres;
    }

    dispatch({
      type: FETCH_MOVIES_GENRES,
      payload,
    });
  }
}

export const fetchCurrentMovie = (id, overrideResults = false) => {
  return async (dispatch) => {
    if (overrideResults) {
      dispatch(clearCurrentMovie());
    }

    let loadingIsDiscarded = false;

    reactor.addEventListener(STOP_CURRENT_MOVIE_FETCHING, () => {
      loadingIsDiscarded = true;
    });

    const url = makeUrl(MOVIE_DETAILS, { id });

    const res = await TMDBApi.$instance.get(url);

    let payload;

    if (res.status && res.status >= 300) {
      payload = null;
    } else {
      payload = res;

      payload.reviews = await fetchMediaData(makeUrl(MOVIES_REVIEWS, { id }), {params: {}}, 1, false, true);
      payload.images = await fetchMediaImages(makeUrl(MOVIES_IMAGES, { id }));
      await dispatch(fetchCurrentMovieSimilar(id, 1));
      await dispatch(fetchCurrentMovieRecommendations(id, 1));
    }

    dispatch({
      type: FETCH_CURRENT_MOVIE,
      payload: loadingIsDiscarded ? null : payload,
    });

    if (!payload) {
      reactor.dispatchEvent(REDIRECT_TO_NOT_FOUND_PAGE);
    }
  }
}

export const fetchCurrentMovieSimilar = (id, page) => {
  return async (dispatch) => {
    const res = await fetchMediaData(makeUrl(MOVIES_SIMILAR, { id }), {params: {}}, page, true);

    let payload;

    if (res.status && res.status >= 300) {
      payload = [];
    } else {
      payload = res;
    }

    dispatch({
      type: FETCH_CURRENT_MOVIE_SIMILAR,
      payload,
    });
  }
}

export const fetchCurrentMovieRecommendations = (id, page) => {
  return async (dispatch) => {
    const res = await fetchMediaData(makeUrl(MOVIES_RECOMMENDATIONS, { id }), {params: {}}, page, true);

    let payload;

    if (res.status && res.status >= 300) {
      payload = [];
    } else {
      payload = res;
    }

    dispatch({
      type: FETCH_CURRENT_MOVIE_RECOMMENDATIONS,
      payload,
    });
  }
}

export const clearCurrentMovie = () => {
  reactor.dispatchEvent(STOP_CURRENT_MOVIE_FETCHING);

  return {
    type: CLEAR_CURRENT_MOVIE,
  }
}

export const clearNewMovies = () => {
  return {
    type: CLEAR_NEW_MOVIES,
  }
}

export const clearPopularMovies = () => {
  return {
    type: CLEAR_POPULAR_MOVIES,
  }
}

