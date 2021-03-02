import { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter} from 'react-router-dom';

import Header from './components/base/Header';
import Loader from './components/base/Loader';
import Navigation from './components/Navigation';
import ScrollToTop from './components/ScrollToTop';

import { loadInitialAppData } from './store/app/actions';

const App = ({isAppInitialDataLoaded, loadInitialAppData}) => {
  useEffect(() => {
    loadInitialAppData();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <ScrollToTop>
          <Header />
          { isAppInitialDataLoaded ? (
            <Navigation />
          ) : (
              <div className="full-screen padding-20 content-centered">
                <Loader color="pattern" />
              </div>
            )
          }
        </ScrollToTop>
      </BrowserRouter>
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
