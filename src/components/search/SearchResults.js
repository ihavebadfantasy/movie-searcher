import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setSearchPageScrollPosition, scrollToSearchPageScrollPosition } from '../../store/search/actions';
import Loader from '../base/Loader';
import Container from '../base/Container';
import { Link } from 'react-router-dom';
import MediaCardLight from '../media/MediaCardLight';
import Button from '../ui/Button';
const SearchResults = ({
  isSearching,
  results,
  customClass = '',
  topScrollPosition,
  setSearchPageScrollPosition,
  scrollToSearchPageScrollPosition,
}) => {
  const [isScrollToTopBtnHidden, setIsScrollToTopBtnHidden] = useState(true);
  // TODO: (bug) fix key error in console
  // TODO: (feature-bug) add scroll to top btn sticked to container in all dimensions, remove it to the left on page with filters
  useEffect(() => {
    const setScrollBtnState = () => {
      if (window.innerHeight + 50 < window.scrollY) {
        setIsScrollToTopBtnHidden(false);
      } else {
        setIsScrollToTopBtnHidden(true);
      }
    }

    setScrollBtnState();

    window.addEventListener('scroll', setScrollBtnState);

    return () => {
      window.removeEventListener('scroll', setScrollBtnState);
    }
  })

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      setSearchPageScrollPosition(scrollY);
    }

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    }
  }, []);

  const onScrollBtnClick = () => {
    setSearchPageScrollPosition(topScrollPosition);
    scrollToSearchPageScrollPosition();
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
        >
          <div className={`search-results ${customClass}`}>
            {results.map((result) => {
              return (
                <Link
                  to={`/movies/${result.id}`}
                  key={result.id}
                  className="search-results-item"
                >
                  <MediaCardLight
                    title={result.title}
                    img={result.poster_path}
                  />
                </Link>
              );
            })
            }

            <Button
              text=">"
              color="error"
              customClass={`search-results-scroll-to-top-btn ${isScrollToTopBtnHidden ? 'hidden' : ''}`}
              onClick={onScrollBtnClick}
            />
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
  };
}

const mapDispatchToProps = {
  setSearchPageScrollPosition,
  scrollToSearchPageScrollPosition,
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
