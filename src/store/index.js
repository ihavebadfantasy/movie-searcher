import thunk from 'redux-thunk';
import { combineReducers, applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer as moviesReducer } from './movies/reducer';
import { reducer as tvShowsReducer } from './tvShows/reducer';
import { reducer as userReducer } from './user/reducer';
import { reducer as appReducer } from './app/reducer';
import { reducer as searchReducer } from './search/reducer';
import { reducer as personReducer } from './person/reducer';

const rootReducer = combineReducers({
  movies: moviesReducer,
  tvShows: tvShowsReducer,
  user: userReducer,
  app: appReducer,
  search: searchReducer,
  person: personReducer,
});

export default createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
