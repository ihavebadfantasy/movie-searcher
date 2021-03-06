import Reactor from './index';
import {
  STOP_CURRENT_MOVIE_FETCHING,
  STOP_CURRENT_TV_SHOW_FETCHING,
  REDIRECT_TO_NOT_FOUND_PAGE,
  SEARCH_NAVIGATION_TOGGLE,
} from './events';

const reactor = new Reactor();

reactor.registerEvent(STOP_CURRENT_MOVIE_FETCHING);
reactor.registerEvent(STOP_CURRENT_TV_SHOW_FETCHING);
reactor.registerEvent(REDIRECT_TO_NOT_FOUND_PAGE);
reactor.registerEvent(SEARCH_NAVIGATION_TOGGLE);

export default reactor;
