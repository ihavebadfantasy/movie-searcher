import {useEffect} from 'react';
import { connect } from 'react-redux';
import {
  fetchCurrentMovie,
  fetchCurrentMovieRecommendations,
  fetchCurrentMovieSimilar,
} from '../../store/movies/actions';
import Container from '../base/Container';
import Loader from '../base/Loader';
import MediaCard from '../media/MediaCard';

const Movies = ({movie, fetchCurrentMovie, match, fetchCurrentMovieSimilar, movieSimilar, movieRecommendations, fetchCurrentMovieRecommendations}) => {
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
    <div className="base-container mt-60-resp mb-30">
      { movie ? (
            <Container
              theme={['withTitle']}
              title={movie.title}
            >
              <MediaCard
                media={movie}
                similar={movieSimilar}
                loadMoreSimilar={loadMoreSimilar}
                recommendations={movieRecommendations}
                loadMoreRecommendations={loadMoreRecommendations}
              />
            </Container>
        ) : (
        <div className="full-screen padding-20 content-centered">
          <Loader color="pattern" />
        </div>
        )
      }
    </div>
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
