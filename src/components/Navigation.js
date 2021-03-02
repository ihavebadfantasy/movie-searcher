import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { Route, useHistory } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Movies from './pages/Movies';
import TvShows from './pages/TvShows';
import { clearCurrentMovie } from '../store/movies/actions';
import { clearCurrentTvShow } from '../store/tvShows/actions';

const Navigation = ({clearCurrentMovie, clearCurrentTvShow}) => {
  const history = useHistory();

  useEffect(() => {
    return history.listen((location) => {
      clearCurrentMovie();
      clearCurrentTvShow();
    });
  },[history])

  return (
    <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/search" component={Search} />
      <Route exact path="/movies/:id" component={Movies} />
      <Route exact path="/tv-shows/:id" component={TvShows} />
    </div>
  );
}

const mapDispatchToProps = {
  clearCurrentMovie,
  clearCurrentTvShow,
}

export default connect(null, mapDispatchToProps)(Navigation);
