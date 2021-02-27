import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Home from './components/Home';
import Header from './components/Header';
import Search from './components/Search';
import { setLocation } from './store/user/actions';
import Loader from './components/Loader';

const App = ({location, setLocation}) => {
  useEffect(() => {
    setLocation();
  }, [])

  return (<div>
    { location.countryCode ? (
      <div>
        <Header />

        <div>
          <Home />
          <Search />
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
  }
}

const mapDispatchToProps = {
  setLocation,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
