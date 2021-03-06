import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import SearchResults from '../search/SearchResults';
import SearchInput from '../forms/SearchInput';
import { setSearchTerm, setResultsCurrentPage, multiSearch } from '../../store/search/actions';
import Pagination from '../ui/Pagination';

const MultiSearch = ({searchTerm, setSearchTerm, results, resultsCurrentPage, resultsTotalPages, searchWasRequested, isSearching, setResultsCurrentPage, multiSearch}) => {
  useEffect(() => {
    if (searchTerm) {
      initSearch(1, true);
    }
  }, [searchTerm]);

  const initSearch = (page = resultsCurrentPage || 1, overrideResults = false) => {
    setResultsCurrentPage(page);
    multiSearch(overrideResults);
  }

  const loadResults = (overrideResults, page) => {
    initSearch(page, overrideResults);
  }
  return (
    <div className="mt-30 base-container pb-60-resp">
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

      <SearchInput
        setSearchTerm={setSearchTerm}
        placeholder="Search for a movie, tv show, person..."
      />

      <div className="mt-60-resp">
        <SearchResults
          isSearching={isSearching}
          results={results}
        />
      </div>

      {results.length > 0 && (
        <Pagination
          showMore={loadResults.bind(null, false, resultsCurrentPage + 1)}
          totalPages={resultsTotalPages}
          currentPage={resultsCurrentPage}
          switchPage={loadResults.bind(null, true)}
        />
      )}

      {results.length < 1 && searchWasRequested && (
        <p className="mt-60-resp gray">We are so sorry, but nothing matching your request was found. Try to change the filters or double check the spelling of search input value.</p>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isSearching: state.search.isSearching,
    searchTerm: state.search.searchTerm,
    results: state.search.results,
    resultsCurrentPage: state.search.resultsCurrentPage,
    resultsTotalPages: state.search.resultsTotalPages,
    genresCheckboxes: state.search.genresCheckboxes,
    searchWasRequested: state.search.searchWasRequested,
  };
}

const mapDispatchToProps = {
  setSearchTerm,
  setResultsCurrentPage,
  multiSearch
}

export default connect(mapStateToProps, mapDispatchToProps)(MultiSearch);
