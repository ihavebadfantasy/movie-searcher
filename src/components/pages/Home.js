import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import SearchInput from '../search/SearchInput';
import MediaCarousel from '../media/MediaCarousel';
import { fetchNewMovies, fetchPopularMovies } from '../../store/movies/actions';
import { fetchNewTvShows, fetchPopularTvShows } from '../../store/tvShows/actions';
import useSlidesPerPage from '../../hooks/useSlidesPerPage';

const types = {
  movies: 'movies',
  tvShows: 'tv-shows',
}

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
  const [slidesPerPage] = useSlidesPerPage();

  useEffect(() => {
    fetchNewMovies(1);
    fetchPopularMovies(1);
    fetchPopularTvShows(1);
    fetchNewTvShows(1);
  }, []);

  const loadMorePopularMovies = (page) => {
    fetchPopularMovies(page);
  }

  const loadMoreNewMovies = (page) => {
    fetchNewMovies(page);
  }

  const loadMorePopularTvShows = (page) => {
    fetchPopularTvShows(page);
  }

  const loadMoreNewTvShows = (page) => {
    fetchNewTvShows(page);
  }


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
        loadMoreData={loadMoreNewMovies}
      />

      <MediaCarousel
        containerTheme={['withTitle']}
        containerClass="mb-30"
        title="The Newest TV-Shows"
        slidesPerPage={slidesPerPage}
        items={newTvShows}
        type={types.tvShows}
        loadMoreData={loadMoreNewTvShows}
      />

      <MediaCarousel
        containerTheme={['withTitle']}
        containerClass="mb-30"
        title="The Most Popular Movies"
        slidesPerPage={slidesPerPage}
        items={popularMovies}
        loadMoreData={loadMorePopularMovies}
      />

      <MediaCarousel
        containerTheme={['withTitle']}
        containerClass="mb-30"
        title="The Most Popular TV-Shows"
        slidesPerPage={slidesPerPage}
        items={popularTvShows}
        type={types.tvShows}
        loadMoreData={loadMorePopularTvShows}
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