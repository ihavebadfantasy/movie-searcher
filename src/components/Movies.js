import {useEffect} from 'react';
import { connect } from 'react-redux';
import { fetchCurrentMovie } from '../store/movies/actions';
import Container from './Container';
import Loader from './Loader';
import MediaCard from './MediaCard';

const hardcodedId = 508442;

const Movies = ({movie, fetchCurrentMovie}) => {
  useEffect(() => {
    fetchCurrentMovie(hardcodedId);
  }, []);

  return (
    <div className="base-container mt-60-resp">
      { movie ? (
            <Container
              theme={['withTitle']}
              title={movie.title}
            >
              <MediaCard media={movie} />
            </Container>
        ) : (<Loader color="pattern" />)
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
