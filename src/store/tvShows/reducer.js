import tvShowsState from './state';
import {
  FETCH_NEW_TV_SHOWS,
  FETCH_POPULAR_TV_SHOWS,
  FETCH_TV_SHOWS_GENRES,
  FETCH_CURRENT_TV_SHOW,
  CLEAR_CURRENT_TV_SHOW,
  FETCH_CURRENT_TV_SHOW_RECOMMENDATIONS,
  FETCH_CURRENT_TV_SHOW_SIMILAR,
  CLEAR_NEW_TV_SHOWS,
  CLEAR_POPULAR_TV_SHOWS,
} from './types';

export const reducer = (state = tvShowsState, action) => {
  switch (action.type) {
    case CLEAR_NEW_TV_SHOWS:
      return {...state, new: []};
    case CLEAR_POPULAR_TV_SHOWS:
      return {...state, popular: []};
    case FETCH_NEW_TV_SHOWS:
      return {...state, new: [...state.new, ...action.payload]};
    case FETCH_POPULAR_TV_SHOWS:
      return {...state, popular: [...state.popular, ...action.payload]};
    case FETCH_TV_SHOWS_GENRES:
      return {...state, genres: action.payload};
    case FETCH_CURRENT_TV_SHOW:
      return {...state, currentTvShow: action.payload};
    case CLEAR_CURRENT_TV_SHOW:
      return {...state, currentTvShow: null, currentTvShowSimilar: [], currentTvShowRecommendations: []};
    case FETCH_CURRENT_TV_SHOW_SIMILAR:
      return {...state, currentTvShowSimilar: [...state.currentTvShowSimilar, ...action.payload]};
    case FETCH_CURRENT_TV_SHOW_RECOMMENDATIONS:
      return {...state, currentTvShowRecommendations: [...state.currentTvShowRecommendations, ...action.payload]};
    default:
      return state;
  }
}
