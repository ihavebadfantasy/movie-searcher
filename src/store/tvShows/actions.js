import {
  TV_SHOWS_URL,
  TV_SHOWS_GENRES_URL,
  TV_SHOW_DETAILS,
  TV_SHOW_SEASON_DETAILS,
  TV_SHOWS_SIMILAR,
  TV_SHOWS_RECOMMENDATIONS,
  TV_SHOWS_REVIEWS,
  TV_SHOWS_IMAGES,
} from '../../api/tmdb/urls';
import {
  FETCH_NEW_TV_SHOWS,
  FETCH_POPULAR_TV_SHOWS,
  FETCH_TV_SHOWS_GENRES,
  FETCH_CURRENT_TV_SHOW,
} from './types';
import { DateTime } from 'luxon';
import fetchMediaData from '../../api/tmdb/fetchMediaData';
import { Api as TMDBApi } from '../../api/tmdb/Api';
import makeUrl from '../../api/makeUrl';
import fetchMediaImages from '../../api/tmdb/fetchMediaImages';

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

export const fetchCurrentTvShow = (id) => {
  return async (dispatch) => {
    const url = makeUrl(TV_SHOW_DETAILS, { id });

    const res = await TMDBApi.$instance.get(url);

    let payload;

    if (res.status && res.status >= 300) {
      payload = null;
    } else {
      payload = res;

      const seasons = [];

      for (let season of payload.seasons) {
        const seasonRes = await fetchSeason(id, season.season_number);

        if (seasonRes) {
          seasons.push(seasonRes);
        }
      }

      payload.seasons = seasons;
      payload.reviews = await fetchMediaData(makeUrl(TV_SHOWS_REVIEWS, { id }), {params: {}}, 1, false, true);
      payload.images = await fetchMediaImages(makeUrl(TV_SHOWS_IMAGES, { id }));
      payload.similar = await fetchMediaData(makeUrl(TV_SHOWS_SIMILAR, { id }), {params: {}}, 1, false, true);
      payload.recommendations = await fetchMediaData(makeUrl(TV_SHOWS_RECOMMENDATIONS, { id }), {params: {}}, 1, false, true);
    }

    dispatch({
      type: FETCH_CURRENT_TV_SHOW,
      payload,
    });
  }
}

const fetchSeason = async (tvShowId, seasonNumber) => {
  const url = makeUrl(TV_SHOW_SEASON_DETAILS, {
    tvId: tvShowId,
    seasonNumber: seasonNumber,
  });

  const res = await TMDBApi.$instance.get(url);

  if (res.status && res.status >= 300) {
    return null;
  }

  return res;
}
