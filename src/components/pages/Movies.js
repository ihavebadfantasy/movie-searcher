import {useEffect} from 'react';
import { connect } from 'react-redux';
import { fetchCurrentMovie} from '../../store/movies/actions';
import Container from '../base/Container';
import Loader from '../base/Loader';
import MediaCard from '../media/MediaCard';

const Movies = ({movie, fetchCurrentMovie, match}) => {
  useEffect(() => {
    const id = match.params.id;

    fetchCurrentMovie(id);
  }, [match.params.id]);

  return (
    <div className="base-container mt-60-resp">
      { movie ? (
            <Container
              theme={['withTitle']}
              title={movie.title}
            >
              <MediaCard media={movie} />
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
  };
}

const mapDispatchToProps = {
  fetchCurrentMovie,
}

export default connect(mapStateToProps, mapDispatchToProps)(Movies);
