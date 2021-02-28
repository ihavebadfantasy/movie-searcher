import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Home from './components/Home';
import Header from './components/Header';
import Search from './components/Search';
import { setLocation } from './store/user/actions';
import { fetchMoviesGenres } from './store/movies/actions';
import { fetchTvShowsGenres } from './store/tvShows/actions';
import Loader from './components/Loader';
import Movies from './components/Movies';

const App = ({location, moviesGenres, tvShowsGenres, setLocation, fetchMoviesGenres, fetchTvShowsGenres}) => {
  const [appLoaded, setAppLoaded] = useState(false);
  // TODO: handle app data loading, atm the app will be loading forever if genres fetching will crash
  useEffect(() => {
    setLocation();
    fetchMoviesGenres();
    fetchTvShowsGenres();
  }, [])

  useEffect(() => {
    if (location.countryCode && moviesGenres.length && tvShowsGenres.length) {
      setAppLoaded(true);
    }
  }, [location, moviesGenres, tvShowsGenres])

  return (<div>
    { appLoaded ? (
      <div>
        <Header />

        <div>
          {/*<Home />*/}
          {/*<Search />*/}
          <Movies />
        </div>
      </div>
    ) : (
      <div className="full-screen padding-20 content-centered">
        <Loader color="pattern" />
      </div>
    )
    }
  </div>);
}

const mapStateToProps = (state) => {
  return {
    location: state.user.location,
    moviesGenres: state.movies.genres,
    tvShowsGenres: state.tvShows.genres,
  }
}

const mapDispatchToProps = {
  setLocation,
  fetchMoviesGenres,
  fetchTvShowsGenres,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
