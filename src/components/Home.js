import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import SearchInput from './SearchInput';
import MediaCarousel from './MediaCarousel';
import useWindowResize from '../hooks/useWindowResize';
import { fetchNewMovies, fetchPopularMovies } from '../store/movies/actions';
import { fetchNewTvShows, fetchPopularTvShows } from '../store/tvShows/actions';

const Home = ({
   newMovies,
   popularMovies,
   newTvShows,
   popularTvShows,
   fetchNewMovies,
   fetchPopularMovies,
   fetchPopularTvShows,
   fetchNewTvShows
}) => {
  const [slidesPerPage, setSlidesPerPage] = useState(5);
  const [windowWidth, layout] = useWindowResize();

  useEffect(() => {
    fetchNewMovies();
    fetchPopularMovies();
    fetchPopularTvShows();
    fetchNewTvShows();
  }, [])

  useEffect(() => {
    switch (layout) {
      case 'phone':
        setSlidesPerPage(1);
        break;
      case 'phablet':
        setSlidesPerPage(2);
        break;
      case 'tablet':
        setSlidesPerPage(3);
        break;
      case 'containerWidth':
        setSlidesPerPage(4);
        break;
      default:
        setSlidesPerPage(5);
    }

  }, [layout])

  return (
    <div className="base-container mt-60-resp">
      <div className="mb-30">
        <SearchInput />
      </div>

      <MediaCarousel
        containerTheme={['withTitle']}
        containerClass="mb-30"
        title="The Newest Movies"
        slidesPerPage={slidesPerPage}
        items={newMovies}
      />

      <MediaCarousel
        containerTheme={['withTitle']}
        containerClass="mb-30"
        title="The Newest TV-Shows"
        slidesPerPage={slidesPerPage}
        items={newTvShows}
      />

      <MediaCarousel
        containerTheme={['withTitle']}
        containerClass="mb-30"
        title="The Most Popular Movies"
        slidesPerPage={slidesPerPage}
        items={popularMovies}
      />

      <MediaCarousel
        containerTheme={['withTitle']}
        containerClass="mb-30"
        title="The Most Popular TV-Shows"
        slidesPerPage={slidesPerPage}
        items={popularTvShows}
      />

    </div>
  );
}

const mapStateToProps = state => {
  return {
    newMovies: state.movies.new,
    popularMovies: state.movies.popular,
    newTvShows: state.tvShows.new,
    popularTvShows: state.tvShows.popular,
  };
}

const mapDispatchToProps = {
  fetchNewMovies,
  fetchPopularMovies,
  fetchNewTvShows,
  fetchPopularTvShows,
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
