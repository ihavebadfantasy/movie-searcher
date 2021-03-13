import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom'
import SearchInput from '../forms/SearchInput';
import {
  setSearchTerm,
  setResultsCurrentPage,
  multiSearch,
  setSearchWasRequested
} from '../../store/search/actions';
import SearchNavigation from '../navigation/SearchNavigation';
import MediaSearchResults from '../search/MediaSearchResults';
import routes from '../navigation/routes';

const navigationItems = [
  {
    href: routes.moviesSearch,
    text: 'Extended Movies Search'
  },
  {
    href: routes.tvShowsSearch,
    text: 'Extended Tv Shows Search'
  },
  {
    href: routes.peopleSearch,
    text: 'Search by People'
  },
  {
    href: routes.companiesSearch,
    text: 'Search by Companies'
  },
];

const MultiSearch = ({
  searchTerm,
  setSearchTerm,
  resultsCurrentPage,
  setResultsCurrentPage,
  multiSearch,
  setSearchWasRequested,
}) => {
  const [searchQuery, setSearchQuery] = useState(searchTerm);

  const history = useHistory();

  useEffect(() => {
    const parseSearchQuery = () => {
      const query = history.location.search;

      if (query) {
        setSearchTerm(query.slice(query.indexOf('=') + 1).replaceAll('%20', ' '));
      }
    }
    console.log('in parse search query', history.location.search)
    parseSearchQuery();
  }, [history]);

  useEffect(() => {
    console.log('in set search term')
    setSearchQuery(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    if (searchQuery) {
      history.push({
        pathname: routes.search,
        search:`?search=${searchQuery}`
      });

      initSearch(1, true);
    } else {
      history.push({
        pathname: routes.search,
        search: '',
      });

      setSearchWasRequested(false);
    }
  }, [searchQuery]);

  const initSearch = (page = resultsCurrentPage || 1, overrideResults = false) => {
    setResultsCurrentPage(page);
    multiSearch(overrideResults);
  }

  const loadResults = (overrideResults, page) => {
    initSearch(page, overrideResults);
  }

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

      <MediaSearchResults
        resultsWrapperClass="mt-60-resp"
        loadResults={loadResults}
      />
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
  multiSearch,
  setSearchWasRequested,
}

export default connect(mapStateToProps, mapDispatchToProps)(MultiSearch);
