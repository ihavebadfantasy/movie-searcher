import { useState } from 'react';
import { connect } from 'react-redux';
import { setResultsCurrentPage, searchByFilters } from '../../store/search/actions';
import MediaSearchResults from './MediaSearchResults';
import MediaSearchFilters from './MediaSearchFilters';

const MediaSearch = ({
  resultsCustomClass,
  paginationCustomClass,
  resultsCurrentPage,
  setResultsCurrentPage,
  searchByFilters,
  genresCheckboxes,
  setGenresCheckboxes,
  yearsCheckboxes,
  setYearsCheckboxes
}) => {
  const [isSearchInputFocused, setIsSearchInputFocused] = useState(false);
  const onKeyPress = (event) => {
    if(event.key === 'Enter' && !isSearchInputFocused){
      initSearch(1, true);
    }
  }

  const initSearch = (page = resultsCurrentPage || 1, overrideResults = false) => {
    setResultsCurrentPage(page);
    searchByFilters(overrideResults);
  }

  const loadResults = (overrideResults, page) => {
    initSearch(page, overrideResults);
  }

  const showMore = loadResults.bind(null, false, resultsCurrentPage + 1);
  const switchPage = loadResults.bind(null, true);

  return (
    <div className="sidebar-page overflow-x-hidden mt-60-resp" onKeyPress={onKeyPress}>
      <MediaSearchFilters
          genresCheckboxes={genresCheckboxes}
          yearsCheckboxes={yearsCheckboxes}
          setGenresCheckboxes={setGenresCheckboxes}
          setYearsCheckboxes={setYearsCheckboxes}
          initSearch={initSearch}
        />

      <MediaSearchResults
        resultsCustomClass={resultsCustomClass}
        paginationCustomClass={paginationCustomClass}
        showMore={showMore}
        switchPage={switchPage}
        resultsWrapperClass="pd-20 pr-0 sidebar-page-main-content"
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    resultsCurrentPage: state.search.resultsCurrentPage,
  };
}

const mapDispatchToProps = {
  setResultsCurrentPage,
  searchByFilters
}

export default connect(mapStateToProps, mapDispatchToProps)(MediaSearch);
