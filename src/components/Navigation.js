import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { Route, useHistory, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Movies from './pages/Movies';
import TvShows from './pages/TvShows';
import NotFound from './pages/NotFound';
import reactor from '../helpers/reactor/Reactor';
import { REDIRECT_TO_NOT_FOUND_PAGE } from '../helpers/reactor/events';

import { clearCurrentMovie } from '../store/movies/actions';
import { clearCurrentTvShow } from '../store/tvShows/actions';

const Navigation = ({clearCurrentMovie, clearCurrentTvShow}) => {
  const history = useHistory();

  useEffect(() => {
    const redirectToNotFoundPage = () => {
      history.push('/not-found');
    }

    reactor.addEventListener(REDIRECT_TO_NOT_FOUND_PAGE, redirectToNotFoundPage);

    return () => {
      reactor.removeEventListener(REDIRECT_TO_NOT_FOUND_PAGE, redirectToNotFoundPage);
    }
  }, [])

  useEffect(() => {
    return history.listen((location) => {
      clearCurrentMovie();
      clearCurrentTvShow();
    });
  },[history])

  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/movies/:id" component={Movies} />
        <Route exact path="/tv-shows/:id" component={TvShows} />
        <Route exact path="/not-found" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

const mapDispatchToProps = {
  clearCurrentMovie,
  clearCurrentTvShow,
}

export default connect(null, mapDispatchToProps)(Navigation);
