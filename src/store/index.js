import thunk from 'redux-thunk';
import { combineReducers, applyMiddleware, createStore } from 'redux';
import { reducer as moviesReducer } from './movies/reducer';
import { reducer as tvShowsReducer } from './tvShows/reducer';
import { reducer as userReducer } from './user/reducer';
import { reducer as appReducer } from './app/reducer';

const rootReducer = combineReducers({
  movies: moviesReducer,
  tvShows: tvShowsReducer,
  user: userReducer,
  app: appReducer,
});

export default createStore(rootReducer, applyMiddleware(thunk));
