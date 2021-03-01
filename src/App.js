import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Home from './components/Home';
import Header from './components/Header';
import Search from './components/Search';
import Loader from './components/Loader';
import Movies from './components/Movies';
import TvShows from './components/TvShows';
import { loadInitialAppData } from './store/app/actions';

const App = ({isAppInitialDataLoaded, loadInitialAppData}) => {
  useEffect(() => {
    loadInitialAppData();
  }, []);

  return (<div>
    { isAppInitialDataLoaded ? (
      <div>
        <Header />

        <div>
          {/*<Home />*/}
          {/*<Search />*/}
          <Movies />
          {/*<TvShows />*/}
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
    isAppInitialDataLoaded: state.app.isInitialDataLoaded,
  }
}

const mapDispatchToProps = {
  loadInitialAppData,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
