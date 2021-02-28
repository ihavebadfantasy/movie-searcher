import { TV_SHOWS_URL, TV_SHOWS_GENRES_URL } from '../../api/tmdb/urls';
import { FETCH_NEW_TV_SHOWS, FETCH_POPULAR_TV_SHOWS, FETCH_TV_SHOWS_GENRES } from './types';
import { DateTime } from 'luxon';
import fetchMediaData from '../../api/tmdb/fetchMediaData';
import { Api as TMDBApi } from '../../api/tmdb/Api';

export const fetchNewTvShows = (page = 'all') => {
  return async (dispatch, getState) => {
    const state = getState();

    const now = DateTime.now();
    const maxAirDate = now.toISODate();
    const minAirDate = now.plus({ months: 1 }).toISODate();

    const config = {
      params: {
        'first_air_date.gte': maxAirDate,
        'first_air_date.lte': minAirDate,
        'region': state.user.location.countryCode,
        'sort_by': 'first_air_date.desc',
      }
    };

    let tvShows;

    if (page === 'all') {
      tvShows = await fetchMediaData(TV_SHOWS_URL, config, 1, true, true);
    } else {
      tvShows = await fetchMediaData(TV_SHOWS_URL, config, page, true);
    }

    dispatch({
      type: FETCH_NEW_TV_SHOWS,
      payload: tvShows,
    });
  }
}

export const fetchPopularTvShows = (page = 'all') => {
  return async (dispatch) => {
    const config = {
      params: {
        'vote_count.gte': 1000,
        'vote_average.gte': 8,
        'sort_by': 'popularity.desc',
      }
    };

    let tvShows;

    if (page === 'all') {
      tvShows = await fetchMediaData(TV_SHOWS_URL, config, 1, true, true);
    } else {
      tvShows = await fetchMediaData(TV_SHOWS_URL, config, page, true);
    }

    dispatch({
      type: FETCH_POPULAR_TV_SHOWS,
      payload: tvShows,
    });
  }
}

export const fetchTvShowsGenres = () => {
  return async (dispatch) => {
    const res = await TMDBApi.$instance.get(TV_SHOWS_GENRES_URL);

    let payload = [];
    if (res.genres) {
      payload = res.genres;
    }

    dispatch({
      type: FETCH_TV_SHOWS_GENRES,
      payload,
    });
  }
}
