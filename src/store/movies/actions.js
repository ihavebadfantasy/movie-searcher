import { DateTime } from 'luxon';
import {
  MOVIES_URL,
  MOVIES_GENRES_URL,
  MOVIE_DETAILS
} from '../../api/tmdb/urls';
import {
  FETCH_NEW_MOVIES,
  FETCH_POPULAR_MOVIES,
  FETCH_MOVIES_GENRES,
  FETCH_CURRENT_MOVIE
} from './types';
import fetchMediaData from '../../api/tmdb/fetchMediaData';
import { Api as TMDBApi } from '../../api/tmdb/Api';
import makeUrl from '../../api/makeUrl';

export const fetchNewMovies = (page = 'all') => {
  return async (dispatch, getState) => {
    const state = getState();

    const now = DateTime.now();
    const maxReleaseDate = now.toISODate();
    const minReleaseDate = now.plus({ months: 1 }).toISODate();

    const config = {
      params: {
        'release_date.gte': maxReleaseDate,
        'release_date.lte': minReleaseDate,
        'region': state.user.location.countryCode,
        'sort_by': 'release_date.desc',
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

export const fetchPopularMovies = (page = 'all') => {
  return async (dispatch) => {
    const config = {
      params: {
        'vote_count.gte': 1000,
        'vote_average.gte': 8,
        'sort_by': 'popularity.desc',
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

export const fetchCurrentMovie = (id) => {
  return async (dispatch) => {
    const url = makeUrl(MOVIE_DETAILS, { id });

    const res = await TMDBApi.$instance.get(url);

    let payload;

    if (res.status && res.status >= 300) {
      payload = null;
    } else {
      payload = res;
    }

    dispatch({
      type: FETCH_CURRENT_MOVIE,
      payload,
    });
  }
}

