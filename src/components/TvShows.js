import {useEffect} from 'react';
import { connect } from 'react-redux';
import { fetchCurrentTvShow } from '../store/tvShows/actions';
import Container from './Container';
import Loader from './Loader';
import MediaCard from './MediaCard';

const hardcodedId = 85271;

const TvShows = ({tvShow, fetchCurrentTvShow}) => {
  useEffect(() => {
    fetchCurrentTvShow(hardcodedId);
  }, []);

  console.log(tvShow);

  return (
    <div className="base-container mt-60-resp">
      { tvShow ? (
        <Container
          theme={['withTitle']}
          title={tvShow.title}
        >
          <MediaCard media={tvShow} />
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
    tvShow: state.tvShows.currentTvShow,
  };
}

const mapDispatchToProps = {
  fetchCurrentTvShow,
}

export default connect(mapStateToProps, mapDispatchToProps)(TvShows);
