import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { Route, useHistory, Switch, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Movies from './pages/Movies';
import TvShows from './pages/TvShows';
import NotFound from './pages/NotFound';
import reactor from '../helpers/reactor/Reactor';
import { REDIRECT_TO_NOT_FOUND_PAGE } from '../helpers/reactor/events';
import routes from '../config/routes';

import { clearCurrentMovie } from '../store/movies/actions';
import { clearCurrentTvShow } from '../store/tvShows/actions';

const Navigation = ({clearCurrentMovie, clearCurrentTvShow, setShowFooter, setShowHeader}) => {
  const history = useHistory();

  const redirectToNotFoundPage = () => {
    history.push(routes.notFound);
  }

  useEffect(() => {
    reactor.addEventListener(REDIRECT_TO_NOT_FOUND_PAGE, redirectToNotFoundPage);

    return () => {
      reactor.removeEventListener(REDIRECT_TO_NOT_FOUND_PAGE, redirectToNotFoundPage);
    }
  }, [])

  useEffect(() => {
    const setHeaderAndFooterState = () => {
      if (history.location.pathname === routes.notFound) {
        setShowHeader(false);
        setShowFooter(false);
        document.body.classList.remove('with-footer');
      } else {
        setShowHeader(true);
        setShowFooter(true);
        document.body.classList.add('with-footer');
      }
    }

    setHeaderAndFooterState();
    return history.listen((location) => {
      clearCurrentMovie();
      clearCurrentTvShow();

      setHeaderAndFooterState();
    });
  },[history]);

  return (
    <div>
      <Switch>
        <Route exact path={routes.home} component={Home} />
        <Route exact path={routes.search} component={Search} />
        <Route exact path={routes.movies} component={Movies} />
        <Route exact path={routes.tvShows} component={TvShows} />
        <Route exact path={routes.notFound} component={NotFound} />
        <Route>
          <Redirect to={routes.notFound} />
        </Route>
      </Switch>
    </div>
  );
}

const mapDispatchToProps = {
  clearCurrentMovie,
  clearCurrentTvShow,
}

export default connect(null, mapDispatchToProps)(Navigation);
