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

const MediaSearch = ({
  resultsCustomClass,
  paginationCustomClass,
  resultsCurrentPage,
  setResultsCurrentPage,
  searchByFilters,
  setScrollPosition,
  scrollToSearchPageScrollPosition,
  setTopScrollPosition,
  topScrollPosition,
  searchType,
  sortTypes,
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

  const initSearch = (page = resultsCurrentPage || 1, overrideResults = false, scrollToSearchPageScrollPosition = false) => {
    setResultsCurrentPage(page);
    searchByFilters(searchType, overrideResults, false, scrollToSearchPageScrollPosition);
  }

  const loadResults = (overrideResults, page, scrollToSearchPageScrollPosition) => {
    initSearch(page, overrideResults, scrollToSearchPageScrollPosition);
  }

  return (
    <div
      className="sidebar-page overflow-x-hidden mt-60-resp"
      onKeyPress={onKeyPress}
      ref={resultsWrapperRef}
    >
      <MediaSearchFilters
        initSearch={initSearch}
        sidebarIsClosed={sidebarIsClosed}
        setSidebarIsClosed={setSidebarIsClosed}
      />

      <MediaSearchResults
        resultsCustomClass={resultsCustomClass}
        paginationCustomClass={paginationCustomClass}
        loadResults={loadResults}
        resultsWrapperClass="pd-20 pr-0 sidebar-page-main-content"
        sortTypes={sortTypes}
        searchType={searchType}
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
