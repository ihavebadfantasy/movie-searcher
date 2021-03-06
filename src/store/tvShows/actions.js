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
  CLEAR_CURRENT_TV_SHOW,
  FETCH_CURRENT_TV_SHOW_RECOMMENDATIONS,
  FETCH_CURRENT_TV_SHOW_SIMILAR,
  CLEAR_POPULAR_TV_SHOWS,
  CLEAR_NEW_TV_SHOWS,
} from './types';
import { DateTime } from 'luxon';
import fetchMediaData from '../../api/tmdb/fetchMediaData';
import { Api as TMDBApi } from '../../api/tmdb/Api';
import makeUrl from '../../helpers/makeUrl';
import fetchMediaImages from '../../api/tmdb/fetchMediaImages';
import reactor from '../../helpers/reactor/Reactor';
import {
  STOP_CURRENT_TV_SHOW_FETCHING,
  REDIRECT_TO_NOT_FOUND_PAGE,
} from '../../helpers/reactor/events';


export const fetchNewTvShows = (page = 'all', overrideResults = false) => {
  return async (dispatch, getState) => {
    if (overrideResults) {
      dispatch(clearNewTvShows());
    }

    const state = getState();

    const now = DateTime.now();
    const maxAirDate = now.toISODate();
    const minAirDate = now.minus({ months: 1 }).toISODate();

    const config = {
      params: {
        'first_air_date.lte': maxAirDate,
        'first_air_date.gte': minAirDate,
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

export const fetchPopularTvShows = (page = 'all', overrideResults = false) => {
  return async (dispatch) => {
    if (overrideResults) {
      dispatch(clearPopularTvShows());
    }

    const config = {
      params: {
        'vote_count.gte': 1000,
        'vote_average.gte': 8,
        'sort_by': 'vote_average.desc',
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

export const fetchCurrentTvShow = (id, overrideResults = false) => {
  return async (dispatch) => {
    if (overrideResults) {
      dispatch(clearCurrentTvShow());
    }

    let loadingIsDiscarded = false;

    reactor.addEventListener(STOP_CURRENT_TV_SHOW_FETCHING, () => {
      loadingIsDiscarded = true;
    });

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
      await dispatch(fetchCurrentTvShowSimilar(id, 1));
      await dispatch(fetchCurrentTvShowRecommendations(id, 1));
    }

    dispatch({
      type: FETCH_CURRENT_TV_SHOW,
      payload: loadingIsDiscarded ? null : payload,
    });

    if (!payload) {
      reactor.dispatchEvent(REDIRECT_TO_NOT_FOUND_PAGE);
    }
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

export const fetchCurrentTvShowSimilar = (id, page) => {
  return async (dispatch) => {
    const res = await fetchMediaData(makeUrl(TV_SHOWS_SIMILAR, { id }), {params: {}}, page, true);

    let payload;

    if (res.status && res.status >= 300) {
      payload = [];
    } else {
      payload = res;
    }

    dispatch({
      type: FETCH_CURRENT_TV_SHOW_SIMILAR,
      payload,
    });
  }
}

export const fetchCurrentTvShowRecommendations = (id, page) => {
  return async (dispatch) => {
    const res = await fetchMediaData(makeUrl(TV_SHOWS_RECOMMENDATIONS, { id }), {params: {}}, page, true);

    let payload;

    if (res.status && res.status >= 300) {
      payload = [];
    } else {
      payload = res;
    }

    dispatch({
      type: FETCH_CURRENT_TV_SHOW_RECOMMENDATIONS,
      payload,
    });
  }
}

export const clearCurrentTvShow = () => {
  reactor.dispatchEvent(STOP_CURRENT_TV_SHOW_FETCHING);

  return {
    type: CLEAR_CURRENT_TV_SHOW,
  }
}

export const clearNewTvShows = () => {
  return {
    type: CLEAR_NEW_TV_SHOWS,
  }
}

export const clearPopularTvShows = () => {
  return {
    type: CLEAR_POPULAR_TV_SHOWS,
  }
}
