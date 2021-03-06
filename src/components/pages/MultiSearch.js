import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import SearchResults from '../search/SearchResults';
import SearchInput from '../forms/SearchInput';
import { setSearchTerm } from '../../store/search/actions';
import Search from './Search';

const MultiSearch = ({searchTerm, setSearchTerm}) => {
  return (
    <div className="mt-30 base-container">
      <ul className="nes-list is-circle mb-60-resp search-navigation">
        <li className="search-navigation-item">
          <Link to="/search">
            Extended Movies Search
          </Link>
        </li>
        <li className="search-navigation-item">
          <Link to="/search">
            Extended Tv-Shows Search
          </Link>
        </li>
        <li className="search-navigation-item">
          <Link to="/search">
            Search by People
          </Link>
        </li>
        <li className="search-navigation-item">
          <Link to="/search">
            Search by Companies
          </Link>
        </li>
      </ul>

      <SearchInput setSearchTerm={setSearchTerm} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    searchTerm: state.search.searchTerm,
  };
}

const mapDispatchToProps = {
  setSearchTerm,
}

export default connect(mapStateToProps, mapDispatchToProps)(MultiSearch);
