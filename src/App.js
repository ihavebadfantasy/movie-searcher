import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter} from 'react-router-dom';
import { LastLocationProvider } from 'react-router-last-location';
import Header from './components/base/Header';
import Loader from './components/base/Loader';
import Navigation from './components/navigation/Navigation';
import ScrollToTop from './components/navigation/ScrollToTop';
import Footer from './components/base/Footer';

import { loadInitialAppData } from './store/app/actions';

const App = ({isAppInitialDataLoaded, loadInitialAppData}) => {
  const [showHeader, setShowHeader] = useState(true);
  const [showFooter, setShowFooter] = useState(true);

  useEffect(() => {
    loadInitialAppData();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <ScrollToTop>
          <LastLocationProvider>
            { showHeader && <Header /> }
            { isAppInitialDataLoaded ? (
              <Navigation
                setShowHeader={setShowHeader}
                setShowFooter={setShowFooter}
              />
            ) : (
              <div className="full-screen padding-20 content-centered">
                <Loader color="pattern" />
              </div>
            )
            }
            { showFooter && <Footer /> }
          </LastLocationProvider>
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
