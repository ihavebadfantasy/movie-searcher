import moviesState from './state';
import {
  FETCH_NEW_MOVIES,
  FETCH_POPULAR_MOVIES,
  FETCH_MOVIES_GENRES,
  FETCH_CURRENT_MOVIE,
  CLEAR_CURRENT_MOVIE,
  FETCH_CURRENT_MOVIE_SIMILAR,
  FETCH_CURRENT_MOVIE_RECOMMENDATIONS,
  CLEAR_NEW_MOVIES,
  CLEAR_POPULAR_MOVIES,
} from './types';

export const reducer = (state = moviesState, action) => {
  switch (action.type) {
    case CLEAR_NEW_MOVIES:
      return {...state, new: []};
    case CLEAR_POPULAR_MOVIES:
      return {...state, popular: []};
    case FETCH_NEW_MOVIES:
      return {...state, new: [...state.new, ...action.payload]};
    case FETCH_POPULAR_MOVIES:
      return {...state, popular: [...state.popular, ...action.payload]};
    case FETCH_MOVIES_GENRES:
      return {...state, genres: action.payload};
    case FETCH_CURRENT_MOVIE:
      return {...state, currentMovie: action.payload};
    case FETCH_CURRENT_MOVIE_SIMILAR:
      return {...state, currentMovieSimilar: [...state.currentMovieSimilar, ...action.payload]};
    case FETCH_CURRENT_MOVIE_RECOMMENDATIONS:
      return {...state, currentMovieRecommendations: [...state.currentMovieRecommendations, ...action.payload]};
    case CLEAR_CURRENT_MOVIE:
      return {...state, currentMovie: null, currentMovieRecommendations: [], currentMovieSimilar: []};
    default:
      return state;
  }
}
