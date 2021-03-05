import { Link } from 'react-router-dom';

const Header = () => {
  // TODO: add real logo
  // TODO: fix styles for search pages
  return (
    <header className="header">
      <div className="base-container">
        <div className="header-wrapper">
          <Link to="/">
            <i className="nes-icon is-large heart" />
          </Link>

          <nav className="header-menu">
            <Link to="/search">
              Search
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
