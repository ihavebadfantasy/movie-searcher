import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom'
import SearchResults from '../search/SearchResults';
import SearchInput from '../forms/SearchInput';
import { setSearchTerm, setResultsCurrentPage, multiSearch } from '../../store/search/actions';
import Pagination from '../ui/Pagination';
import SearchNavigation from '../SearchNavigation';

const navigationItems = [
  {
    href: '/search/movies',
    text: 'Extended Movies Search'
  },
  {
    href: '/search/tv-shows',
    text: 'Extended Tv Shows Search'
  },
  {
    href: '/search/people',
    text: 'Search by People'
  },
  {
    href: '/search/companies',
    text: 'Search by Companies'
  },
];

const MultiSearch = ({searchTerm, setSearchTerm, results, resultsCurrentPage, resultsTotalPages, searchWasRequested, isSearching, setResultsCurrentPage, multiSearch}) => {
  const [searchQuery, setSearchQuery] = useState(searchTerm);

  const history = useHistory();

  useEffect(() => {
    const parseSearchQuery = () => {
      const query = history.location.search;
      if (query) {
        setSearchTerm(query.slice(query.indexOf('=') + 1));
      }
    }

    parseSearchQuery();
  }, [history])

  useEffect(() => {
    if (searchTerm) {
      setSearchQuery(searchTerm);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (searchQuery) {
      history.push({
        pathname: '/search',
        search:`?search=${searchQuery}`
      });

      initSearch(1, true);
    }
  }, [searchQuery]);

  const initSearch = (page = resultsCurrentPage || 1, overrideResults = false) => {
    setResultsCurrentPage(page);
    multiSearch(overrideResults);
  }

  const loadResults = (overrideResults, page) => {
    initSearch(page, overrideResults);
  }

  // TODO: fix loader styles
  // TODO: add not found message removing when clearing search query

  return (
    <div className="mt-30 base-container pb-60-resp">
      <SearchNavigation
        items={navigationItems}
      />
      <SearchInput
        setSearchTerm={setSearchTerm}
        placeholder="Search for a movie, tv show, person..."
        searchTerm={searchTerm}
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
