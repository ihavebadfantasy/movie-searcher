import { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { setSearchPageScrollPosition, scrollToSearchPageScrollPosition } from '../../store/search/actions';
import Loader from '../base/Loader';
import Container from '../base/Container';
import { Link } from 'react-router-dom';
import MediaCardLight from '../media/MediaCardLight';
import FixedButton from '../ui/FixedButton';
import { MOVIES, TV_SHOWS } from '../../config/searchByFiltersTypes';

const SearchResults = ({
  isSearching,
  results,
  customClass = '',
  topScrollPosition,
  setSearchPageScrollPosition,
  scrollToSearchPageScrollPosition,
  searchPageScrollPosition,
  searchType = null,
}) => {
  const [isScrollToTopBtnHidden, setIsScrollToTopBtnHidden] = useState(true);
  const [baseUrl, setBaseUrl] = useState(null);
  // TODO: (bug) fix key error in console
  const containerRef = useRef();

  useEffect(() => {
    switch (searchType) {
      case TV_SHOWS:
        setBaseUrl('/tv-shows');
        break;
      case MOVIES:
        setBaseUrl('/movies');
        break;
    }
    if (searchPageScrollPosition) {
      //  console.log('in searchResults', searchPageScrollPosition, document.documentElement.scrollHeight, results.length);
      scrollToSearchPageScrollPosition();
    }

    const setScrollBtnState = () => {
      if (window.innerHeight + 50 < window.scrollY) {
        setIsScrollToTopBtnHidden(false);
      } else {
        setIsScrollToTopBtnHidden(true);
      }
    }

    const onScroll = () => {
      const scrollY = window.scrollY;
      setSearchPageScrollPosition(scrollY);
    }

    setScrollBtnState();

    window.addEventListener('scroll', setScrollBtnState);

    setTimeout(() => {
      window.addEventListener('scroll', onScroll);
    }, 500)

    return () => {
      window.removeEventListener('scroll', setScrollBtnState);
      window.removeEventListener('scroll', onScroll);
    }
  }, []);

  const onScrollBtnClick = () => {
    setSearchPageScrollPosition(topScrollPosition);
    scrollToSearchPageScrollPosition(true);
  }

  const renderResults = () => {
    if (isSearching) {
      return (
        <div className="full-screen content-centered">
          <Loader />
        </div>
      );
    }

    if (results.length) {
      return (
        <Container
          theme={['withTitle']}
          title="Results"
          customClass="light-border"
          innerRef={containerRef}
        >
          <FixedButton
            color="error"
            containerRef={containerRef}
            text=">"
            topOffset={40}
            onClick={onScrollBtnClick}
            customClass={`search-results-scroll-to-top-btn ${isScrollToTopBtnHidden ? 'hidden' : ''}`}
          />

          <div className={`search-results ${customClass}`}>
            {results.map((result) => {
              let resultBaseUrl = baseUrl;

              if (!resultBaseUrl) {
                resultBaseUrl = result.media_type === TV_SHOWS ? '/tv-shows' : 'movies'
              }

              return (
                <Link
                  to={`${resultBaseUrl}/${result.id}`}
                  key={result.id}
                  className="search-results-item"
                >
                  <MediaCardLight
                    title={result.title || result.name}
                    img={result.poster_path}
                  />
                </Link>
              );
            })
            }
          </div>
        </Container>
      );
    }
  }

  return (
    <div>
      {renderResults()}
    </div>
    );
}

const mapStateToProps = state => {
  return {
    topScrollPosition: state.search.topScrollPosition,
    searchPageScrollPosition: state.search.searchPageScrollPosition,
  };
}

const mapDispatchToProps = {
  setSearchPageScrollPosition,
  scrollToSearchPageScrollPosition,
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
