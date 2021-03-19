import { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import {
  fetchCurrentMovie,
  fetchCurrentMovieRecommendations,
  fetchCurrentMovieSimilar,
} from '../../store/movies/actions';
import Container from '../base/Container';
import Loader from '../base/Loader';
import MediaCard from '../media/MediaCard';
import useWindowResize from '../../hooks/useWindowResize';
import FixedButton from '../ui/FixedButton';
import { useLastLocation } from 'react-router-last-location';
import routes from '../navigation/routes';
import { useTranslation } from 'react-i18next';

const Movies = ({
  movie,
  fetchCurrentMovie,
  match,
  fetchCurrentMovieSimilar,
  movieSimilar,
  movieRecommendations,
  fetchCurrentMovieRecommendations,
  history,
  language,
}) => {
  const [ t ] = useTranslation('general');
  const [windowWidth] = useWindowResize();
  const [isBackButtonVisible, setIsBackButtonVisible] = useState(false);
  const [backToSearchPath, setBackToSearchPath] = useState(null);

  const containerRef = useRef();

  const lastLocation = useLastLocation();

  useEffect(() => {
    if (lastLocation && lastLocation.pathname.includes(routes.search)) {
      setIsBackButtonVisible(true);
      setBackToSearchPath(lastLocation.pathname);
    }
  }, []);

  useEffect(() => {
    const id = match.params.id;

    fetchCurrentMovie(id, true);
  }, [match.params.id, language]);

  const loadMoreSimilar = (page) => {
    fetchCurrentMovieSimilar(movie.id, page);
  }

  const loadMoreRecommendations = (page) => {
    fetchCurrentMovieRecommendations(movie.id, page);
  }

  return (
    <>
      { movie ? (
        <div className="pb-60-resp">
            <Container
              theme={['withTitle']}
              title={movie.title}
              customClass="base-container mt-60-resp mb-30"
              innerRef={containerRef}
            >
              { isBackButtonVisible && <FixedButton
                color="error"
                containerRef={containerRef}
                topOffset={30}
                text={t('backToSearchResultsBtn')}
                shortText="<"
                onClick={() => {
                  history.push(backToSearchPath);
                }}
              />}

              <MediaCard
                media={movie}
                similar={movieSimilar}
                loadMoreSimilar={loadMoreSimilar}
                recommendations={movieRecommendations}
                loadMoreRecommendations={loadMoreRecommendations}
                customClass={isBackButtonVisible ? 'pd-top-50': ''}
              />
            </Container>
        </div>
        ) : (
        <div className="base-container">
          <div className="full-screen-with-header-and-footer padding-20 content-centered">
            <Loader color="pattern" />
          </div>
        </div>
        )
      }
    </>
  );
}

const mapStateToProps = state => {
  return {
    movie: state.movies.currentMovie,
    movieSimilar: state.movies.currentMovieSimilar,
    movieRecommendations: state.movies.currentMovieRecommendations,
    language: state.user.language,
  };
}

const mapDispatchToProps = {
  fetchCurrentMovie,
  fetchCurrentMovieSimilar,
  fetchCurrentMovieRecommendations,
}

export default connect(mapStateToProps, mapDispatchToProps)(Movies);
