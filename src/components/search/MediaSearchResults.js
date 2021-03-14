import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setSearchPageScrollPosition } from '../../store/search/actions';
import SearchResults from './SearchResults';
import Pagination from '../ui/Pagination';
import SortSelect from './SortSelect';
import routes from '../navigation/routes';

const MediaSearchResults = ({
  isSearching,
  resultsCustomClass = '',
  results,
  resultsTotalPages,
  resultsCurrentPage,
  paginationCustomClass = '',
  searchWasRequested,
  resultsWrapperClass = '',
  loadResults,
  setScrollPosition,
  topScrollPosition,
}) => {
  const showMore = loadResults.bind(null, false, resultsCurrentPage + 1);
  const [isSortSelectVisible, setIsSortSelectVisible] = useState('false');

  const history = useHistory();

  useEffect(() => {
    if (history.location.pathname === routes.moviesSearch || history.location.pathname === routes.tvShowsSearch) {
      setIsSortSelectVisible(true);
    } else {
      setIsSortSelectVisible(false);
    }
  }, [history])

  const switchPage = (page) => {
    setScrollPosition(topScrollPosition);
    loadResults(true, page, true);
  };

  return (
    <div className={resultsWrapperClass}>
      { isSortSelectVisible && <SortSelect /> }

      <SearchResults
        isSearching={isSearching}
        results={results}
        customClass={resultsCustomClass}
      />

      <Pagination
        showMore={showMore}
        totalPages={resultsTotalPages}
        currentPage={resultsCurrentPage}
        switchPage={switchPage}
        customClass={paginationCustomClass}
        visible={results.length > 0}
      />

      {results.length < 1 && searchWasRequested && (
        <p className="mt-60-resp gray">We are so sorry, but nothing matching your request was found. Try to change the filters or double check the spelling of search input value.</p>
      )}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    results: state.search.results,
    isSearching: state.search.isSearching,
    resultsCurrentPage: state.search.resultsCurrentPage,
    resultsTotalPages: state.search.resultsTotalPages,
    searchWasRequested: state.search.searchWasRequested,
    topScrollPosition: state.search.topScrollPosition,
  }
}

const mapDispatchToProps = {
  setScrollPosition: setSearchPageScrollPosition,
};

export default connect(mapStateToProps, mapDispatchToProps)(MediaSearchResults);
