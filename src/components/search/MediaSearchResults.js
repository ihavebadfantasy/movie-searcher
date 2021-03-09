import { connect } from 'react-redux';
import { setSearchPageScrollPosition, scrollToSearchPageScrollPosition } from '../../store/search/actions';
import SearchResults from './SearchResults';
import Pagination from '../ui/Pagination';
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
  scrollToSearchPageScrollPosition,
  topScrollPosition,
}) => {
  const showMore = loadResults.bind(null, false, resultsCurrentPage + 1);
  const switchPage = (page) => {
    loadResults(true, page);
    setScrollPosition(topScrollPosition);
    scrollToSearchPageScrollPosition();
  };

  return (
    <div className={resultsWrapperClass}>
      <SearchResults
        isSearching={isSearching}
        results={results}
        customClass={resultsCustomClass}
      />

      {results.length > 0 && (
        <Pagination
          showMore={showMore}
          totalPages={resultsTotalPages}
          currentPage={resultsCurrentPage}
          switchPage={switchPage}
          customClass={paginationCustomClass}
        />
      )}

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
  scrollToSearchPageScrollPosition,
};

export default connect(mapStateToProps, mapDispatchToProps)(MediaSearchResults);
