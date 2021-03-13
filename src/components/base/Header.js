import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearAllSearchStore, setSearchTerm } from '../../store/search/actions';
import routes from '../navigation/routes';

const Header = ({ clearAllSearchStore, setSearchTerm }) => {
  const [isSearchPage, setIsSearchPage] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const detectSearchPage = () => {
      if (history.location.pathname.includes(routes.search)) {
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
    history.push(routes.search);
  }

  const onHomeLinkClick = (e) => {
    e.preventDefault();
    setSearchTerm('');
    history.push(routes.home);
  }

  const renderSearchLink = () => {
    if (!isSearchPage) {
      return (
        <a
          href={routes.search}
          onClick={onSearchLinkClick}
        >
          Search
        </a>
      );
    }

    return null;
  }

  return (
    <header className={`header ${isSearchPage ? 'no-border': ''}`}>
      <div className="base-container">
        <div className="header-wrapper">
          <a
            href={routes.home}
            onClick={onHomeLinkClick}
          >
            <i className="nes-icon is-large heart" />
          </a>

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
  setSearchTerm,
}

export default connect(null, mapDispatchToProps)(Header);
