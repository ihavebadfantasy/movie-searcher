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

const Movies = ({
  movie,
  fetchCurrentMovie,
  match,
  fetchCurrentMovieSimilar,
  movieSimilar,
  movieRecommendations,
  fetchCurrentMovieRecommendations,
  history
}) => {
  const [windowWidth] = useWindowResize();
  const [isBackButtonVisible, setIsBackButtonVisible] = useState(false);

  const containerRef = useRef();

  const lastLocation = useLastLocation();

  useEffect(() => {
    if (lastLocation && lastLocation.pathname.includes(routes.search)) {
      setIsBackButtonVisible(true);
    }
  }, []);

  useEffect(() => {
    const id = match.params.id;

    fetchCurrentMovie(id);
  }, [match.params.id]);

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
                text="Back to Search Results"
                shortText="<"
                onClick={() => {
                  history.goBack();
                }}
              />}

              <MediaCard
                media={movie}
                similar={movieSimilar}
                loadMoreSimilar={loadMoreSimilar}
                recommendations={movieRecommendations}
                loadMoreRecommendations={loadMoreRecommendations}
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
  };
}

const mapDispatchToProps = {
  fetchCurrentMovie,
  fetchCurrentMovieSimilar,
  fetchCurrentMovieRecommendations,
}

export default connect(mapStateToProps, mapDispatchToProps)(Movies);
