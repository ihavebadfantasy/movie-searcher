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
import { ThemeProvider } from './contexts/ThemeContext';
import { setTheme } from './store/app/actions';
import config from './config';

const App = ({isAppInitialDataLoaded, loadInitialAppData, theme, setTheme}) => {
  const [showHeader, setShowHeader] = useState(true);
  const [showFooter, setShowFooter] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const handleThemeChange = () => {
    const themeLinkTag = document.querySelector('#theme');

    if (theme === config.themes.basic) {
      themeLinkTag.href = config.themes.basicUrl;
      document.querySelector('html').classList.remove('nes')
      document.querySelector('html').classList.add('basic');

      return;
    }

    if (theme === config.themes.nes) {
      themeLinkTag.href = config.themes.nesUrl;
      document.querySelector('html').classList.remove('basic');
      document.querySelector('html').classList.add('nes')
    }
  }

  useEffect(() => {
    handleThemeChange();
  }, [theme]);

  useEffect(() => {
    loadInitialAppData();

    setIsInitialLoad(false);
  }, []);

  return (
    <>
      { handleThemeChange() }

      <ThemeProvider value={{ theme, setTheme }}>
        <BrowserRouter>
          <ScrollToTop />
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
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isAppInitialDataLoaded: state.app.isInitialDataLoaded,
    theme: state.app.theme,
  }
}

const mapDispatchToProps = {
  loadInitialAppData,
  setTheme,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
