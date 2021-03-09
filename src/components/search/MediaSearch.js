import { useState, useRef, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import {
  setResultsCurrentPage,
  searchByFilters,
  setSearchPageScrollPosition,
  scrollToSearchPageScrollPosition,
  setTopScrollPosition,
} from '../../store/search/actions';
import MediaSearchResults from './MediaSearchResults';
import MediaSearchFilters from './MediaSearchFilters';
import useWindowResize, { containerWidth } from '../../hooks/useWindowResize';
import reactor from '../../helpers/reactor/Reactor';
import { SEARCH_NAVIGATION_TOGGLE } from '../../helpers/reactor/events';

// TODO: (secondary feature) add search by term + filters
// TODO: (secondary feature) add strict search mode with radio filters in countries checkbox

// TODO: (feature) change years filter to a range
// TODO: (feature) add filter bt released only, featured only
// TODO: (complicated feature) find a way search by countries filter
// TODO: (feature) add strict search mode with radio filters in genres checkbox

const MediaSearch = ({
  resultsCustomClass,
  paginationCustomClass,
  resultsCurrentPage,
  setResultsCurrentPage,
  searchByFilters,
  genresCheckboxes,
  setGenresCheckboxes,
  yearsCheckboxes,
  setYearsCheckboxes,
  setScrollPosition,
  scrollToSearchPageScrollPosition,
  setTopScrollPosition,
  topScrollPosition
}) => {
  const [isSearchInputFocused, setIsSearchInputFocused] = useState(false);
  const [sidebarIsClosed, setSidebarIsClosed] = useState(false);

  const [windowWidth] = useWindowResize();

  const resultsWrapperRef = useRef();

  useEffect(() => {
    const detectTopScrollPosition = () => {
      let top = 0;
      if (resultsWrapperRef.current) {
        top = resultsWrapperRef.current.getBoundingClientRect().top;
      }

      setTopScrollPosition(top);
    }

    detectTopScrollPosition();

    window.addEventListener('resize', detectTopScrollPosition);
    reactor.addEventListener(SEARCH_NAVIGATION_TOGGLE, detectTopScrollPosition);

    return () => {
      window.removeEventListener('resize', detectTopScrollPosition);
      reactor.removeEventListener(SEARCH_NAVIGATION_TOGGLE, detectTopScrollPosition);
    }
  }, []);

  const onKeyPress = (event) => {
    if(event.key === 'Enter' && !isSearchInputFocused){
      initSearch(1, true);

      if (windowWidth <= containerWidth) {
        setSidebarIsClosed(true);
      }

      setScrollPosition(topScrollPosition);
      scrollToSearchPageScrollPosition();
    }
  }

  const initSearch = (page = resultsCurrentPage || 1, overrideResults = false) => {
    setResultsCurrentPage(page);
    searchByFilters(overrideResults);
  }

  const loadResults = (overrideResults, page) => {
    initSearch(page, overrideResults);
  }

  return (
    <div
      className="sidebar-page overflow-x-hidden mt-60-resp"
      onKeyPress={onKeyPress}
      ref={resultsWrapperRef}
    >
      <MediaSearchFilters
        genresCheckboxes={genresCheckboxes}
        yearsCheckboxes={yearsCheckboxes}
        setGenresCheckboxes={setGenresCheckboxes}
        setYearsCheckboxes={setYearsCheckboxes}
        initSearch={initSearch}
        sidebarIsClosed={sidebarIsClosed}
        setSidebarIsClosed={setSidebarIsClosed}
      />

      <MediaSearchResults
        resultsCustomClass={resultsCustomClass}
        paginationCustomClass={paginationCustomClass}
        loadResults={loadResults}
        resultsWrapperClass="pd-20 pr-0 sidebar-page-main-content"
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    resultsCurrentPage: state.search.resultsCurrentPage,
    topScrollPosition: state.search.topScrollPosition,
  };
}

const mapDispatchToProps = {
  setResultsCurrentPage,
  searchByFilters,
  setScrollPosition: setSearchPageScrollPosition,
  scrollToSearchPageScrollPosition,
  setTopScrollPosition,
}

export default connect(mapStateToProps, mapDispatchToProps)(MediaSearch);
