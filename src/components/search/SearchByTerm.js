import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom'
import SearchInput from '../forms/SearchInput';
import {
  setSearchTerm,
  setResultsCurrentPage,
  setSearchWasRequested,
} from '../../store/search/actions';
import SearchNavigation from '../navigation/SearchNavigation';
import MediaSearchResults from '../search/MediaSearchResults';

const SearchByTerm = ({
  searchTerm,
  setSearchTerm,
  resultsCurrentPage,
  setResultsCurrentPage,
  searchInit,
  setSearchWasRequested,
  navigationItems,
  searchType = null,
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

    parseSearchQuery();
  }, [history]);

  useEffect(() => {
    setSearchQuery(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    if (searchQuery) {
      history.push({
        pathname: history.location.pathname,
        search:`?search=${searchQuery}`
      });

      initSearch(1, true);
    } else {
      history.push({
        pathname: history.location.pathname,
        search: '',
      });

      setSearchWasRequested(false);
    }
  }, [searchQuery]);

  const initSearch = (page = resultsCurrentPage || 1, overrideResults = false, scrollPageAfterResultsLoaded = false) => {
    setResultsCurrentPage(page);
    searchInit(overrideResults, false, scrollPageAfterResultsLoaded);
  }

  const loadResults = (overrideResults, page, scrollPageAfterResultsLoaded) => {
    initSearch(page, overrideResults, scrollPageAfterResultsLoaded);
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
        searchType={searchType}
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
  setSearchWasRequested,
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchByTerm);
