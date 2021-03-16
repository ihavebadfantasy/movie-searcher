import { useEffect } from 'react';
import { connect } from 'react-redux';
import SearchInput from '../forms/SearchInput';
import MediaCarousel from '../media/MediaCarousel';
import { fetchNewMovies, fetchPopularMovies } from '../../store/movies/actions';
import { fetchNewTvShows, fetchPopularTvShows } from '../../store/tvShows/actions';
import { setSearchTerm } from '../../store/search/actions';
import useSlidesPerPage from '../../hooks/useSlidesPerPage';
import routes from '../navigation/routes';
import { useTranslation } from 'react-i18next';

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
   fetchNewTvShows,
   setSearchTerm,
   searchTerm,
   history,
   language,
}) => {
  const [ t ] = useTranslation('homepage');
  const [slidesPerPage] = useSlidesPerPage();

  useEffect(() => {
    fetchNewMovies(1, true);
    fetchPopularMovies(1, true);
    fetchPopularTvShows(1, true);
    fetchNewTvShows(1, true);
  }, [language]);

  useEffect(() => {
    if (searchTerm) {
      history.push(routes.search);
    }
  }, [searchTerm]);

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
    <div className="base-container mt-60-resp pb-60-resp">
      <div className="mb-30">
        <SearchInput
          setSearchTerm={setSearchTerm}
          placeholder={t('searchInputPlaceholder')}
          searchTerm={searchTerm}
        />
      </div>

      <MediaCarousel
        containerTheme={['withTitle']}
        containerClass="mb-30"
        title={t('newMoviesCarouselTitle')}
        slidesPerPage={slidesPerPage}
        items={newMovies}
        loadMoreData={loadMoreNewMovies}
      />

      <MediaCarousel
        containerTheme={['withTitle']}
        containerClass="mb-30"
        title={t('newTvShowCarouselTitle')}
        slidesPerPage={slidesPerPage}
        items={newTvShows}
        type={types.tvShows}
        loadMoreData={loadMoreNewTvShows}
      />

      <MediaCarousel
        containerTheme={['withTitle']}
        containerClass="mb-30"
        title={t('popularMoviesCarouselTitle')}
        slidesPerPage={slidesPerPage}
        items={popularMovies}
        loadMoreData={loadMorePopularMovies}
      />

      <MediaCarousel
        containerTheme={['withTitle']}
        containerClass="mb-30"
        title={t('popularTvShowsCarouselTitle')}
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
    searchTerm: state.search.searchTerm,
    language: state.user.language,
  };
}

const mapDispatchToProps = {
  fetchNewMovies,
  fetchPopularMovies,
  fetchNewTvShows,
  fetchPopularTvShows,
  setSearchTerm,
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
