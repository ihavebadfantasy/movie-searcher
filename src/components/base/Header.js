import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearAllSearchStore } from '../../store/search/actions';

const Header = ({ clearAllSearchStore }) => {
  const history = useHistory();

  const onSearchLinkClick = (e) => {
    e.preventDefault();
    console.log('in event');
    clearAllSearchStore();
    history.push('/search');
  }
  // TODO: add real logo
  return (
    <header className="header">
      <div className="base-container">
        <div className="header-wrapper">
          <Link to="/">
            <i className="nes-icon is-large heart" />
          </Link>

          <nav className="header-menu">
            <a
              href="/search"
              onClick={onSearchLinkClick}
            >
              Search
            </a>
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
