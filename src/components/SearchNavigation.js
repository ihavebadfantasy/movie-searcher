import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearAllSearchStore } from '../store/search/actions';

const SearchNavigation = ({clearAllSearchStore}) => {
  const history = useHistory();

  const onLinkClick = (e) => {
    e.preventDefault();

    const path = e.target.href.slice(e.target.href.indexOf('/search/'));

    clearAllSearchStore();
    history.push(path);
  }

  return (
    <ul className="nes-list is-circle mb-60-resp search-navigation">
      <li className="search-navigation-item">
        <a
          href="/search/movies"
          onClick={onLinkClick}
        >
          Extended Movies Search
        </a>
      </li>
      <li className="search-navigation-item">
        <a
          href="/search"
          onClick={onLinkClick}
        >
          Extended Tv-Shows Search
        </a>
      </li>
      <li className="search-navigation-item">
        <a
          href="/search"
          onClick={onLinkClick}
        >
          Search by People
        </a>
      </li>
      <li className="search-navigation-item">
        <a
          href="/search"
          onClick={onLinkClick}
        >
          Search by Companies
        </a>
      </li>
    </ul>
  );
}

const mapDispatchToProps = {
  clearAllSearchStore,
}

export default connect(null, mapDispatchToProps)(SearchNavigation);
