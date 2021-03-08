import { connect } from 'react-redux';
import SearchResults from './SearchResults';
import Pagination from '../ui/Pagination';

const MediaSearchResults = ({
  isSearching,
  resultsCustomClass = '',
  results,
  showMore,
  resultsTotalPages,
  resultsCurrentPage,
  switchPage,
  paginationCustomClass = '',
  searchWasRequested,
  resultsWrapperClass = '',
}) => {
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
  }
}

export default connect(mapStateToProps)(MediaSearchResults);
