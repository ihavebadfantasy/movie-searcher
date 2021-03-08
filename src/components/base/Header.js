import { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearAllSearchStore } from '../../store/search/actions';

const Header = ({ clearAllSearchStore }) => {
  const [isSearchPage, setIsSearchPage] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const detectSearchPage = () => {
      if (history.location.pathname.includes('/search')) {
        setIsSearchPage(true);
      } else {
        setIsSearchPage(false);
      }
    }

    detectSearchPage();

    history.listen(detectSearchPage);
  }, [history])

  const onSearchLinkClick = (e) => {
    e.preventDefault();
    clearAllSearchStore();
    history.push('/search');
  }

  const renderSearchLink = () => {
    if (!isSearchPage) {
      return (
        <a
          href="/search"
          onClick={onSearchLinkClick}
        >
          Search
        </a>
      );
    }

    return null;
  }
  // TODO: (feature) add real logo
  return (
    <header className={`header ${isSearchPage ? 'no-border': ''}`}>
      <div className="base-container">
        <div className="header-wrapper">
          <Link to="/">
            <i className="nes-icon is-large heart" />
          </Link>

          <nav className="header-menu">
            {renderSearchLink()}
          </nav>
        </div>
      </div>
    </header>
  );
}

const mapDispatchToProps = {
  clearAllSearchStore,
}

export default connect(null, mapDispatchToProps)(Header);
