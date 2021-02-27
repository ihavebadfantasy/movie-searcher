import thunk from 'redux-thunk';
import { combineReducers, applyMiddleware, createStore } from 'redux';
import { reducer as moviesReducer } from './movies/reducer';
import { reducer as tvShowsReducer } from './tvShows/reducer';
import { reducer as userReducer } from './user/reducer';

const rootReducer = combineReducers({
  movies: moviesReducer,
  tvShows: tvShowsReducer,
  user: userReducer,
});

export default createStore(rootReducer, applyMiddleware(thunk));
