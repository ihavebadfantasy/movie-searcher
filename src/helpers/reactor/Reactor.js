import Reactor from './index';
import { STOP_CURRENT_MOVIE_FETCHING, STOP_CURRENT_TV_SHOW_FETCHING } from './events';

const reactor = new Reactor();

reactor.registerEvent(STOP_CURRENT_MOVIE_FETCHING);
reactor.registerEvent(STOP_CURRENT_TV_SHOW_FETCHING);

export default reactor;
