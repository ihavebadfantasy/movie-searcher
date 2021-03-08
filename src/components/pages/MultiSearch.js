import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom'
import SearchInput from '../forms/SearchInput';
import { setSearchTerm, setResultsCurrentPage, multiSearch } from '../../store/search/actions';
import SearchNavigation from '../navigation/SearchNavigation';
import MediaSearchResults from '../search/MediaSearchResults';

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

const MultiSearch = ({searchTerm, setSearchTerm, resultsCurrentPage, setResultsCurrentPage, multiSearch}) => {
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

  const showMore = loadResults.bind(null, false, resultsCurrentPage + 1);
  const switchPage = loadResults.bind(null, true);

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

      <MediaSearchResults
        resultsWrapperClass="mt-60-resp"
        showMore={showMore}
        switchPage={switchPage}
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
  multiSearch
}

export default connect(mapStateToProps, mapDispatchToProps)(MultiSearch);
