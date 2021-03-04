import {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { fetchCurrentTvShow, fetchCurrentTvShowSimilar, fetchCurrentTvShowRecommendations } from '../../store/tvShows/actions';
import Container from '../base/Container';
import Loader from '../base/Loader';
import MediaCard from '../media/MediaCard';
import Accordion from '../ui/Accordion';
import generateDatestring from '../../helpers/generateDatestring';
import setSelectedItem from '../../helpers/accordion/setSelectedItem';

const mapSeasonsToAccordionItems = (seasons) => {
  // TODO: show 404 page if media not found
  return seasons.map((season) => {
    const content = season.episodes.map((episode) => {
      return {
        title: episode.name,
        content: episode.overview,
        date: episode.air_date,
      }
    });

    return {
      id: season.id,
      header: season.name,
      headerDate: generateDatestring(season.air_date),
      content,
      selected: false,
    };
  })
}

const TvShows = ({tvShow, fetchCurrentTvShow, match, fetchCurrentTvShowSimilar, fetchCurrentTvShowRecommendations, tvShowSimilar, tvShowRecommendations}) => {
  const [seasonsAccordionItems, setSeasonsAccordionItems] = useState([]);

  useEffect(() => {
    const id = match.params.id;

    fetchCurrentTvShow(id);
  }, [match.params.id]);

  useEffect(() => {
    if (tvShow && tvShow.seasons) {
      setSeasonsAccordionItems(mapSeasonsToAccordionItems(tvShow.seasons));
    }
  }, [tvShow]);

  const setSelectedSeason = setSelectedItem.bind(null, seasonsAccordionItems, setSeasonsAccordionItems);

  const loadMoreSimilar = (page) => {
    fetchCurrentTvShowSimilar(tvShow.id, page);
  }

  const loadMoreRecommendations = (page) => {
    fetchCurrentTvShowRecommendations(tvShow.id, page);
  }

  return (
    <>
      { tvShow ? (
        <Container
          theme={['withTitle']}
          title={tvShow.name}
          customClass="base-container mt-60-resp mb-30"
        >
          <MediaCard
            media={tvShow}
            type="tv-shows"
            recommendations={tvShowRecommendations}
            loadMoreRecommendations={loadMoreRecommendations}
            similar={tvShowSimilar}
            loadMoreSimilar={loadMoreSimilar}
          >
            <div className="mt-30">
              <Accordion
                items={seasonsAccordionItems}
                setSelected={setSelectedSeason}
              />
            </div>
          </MediaCard>
        </Container>
      ) : (
        <div className="full-screen-with-header-and-footer padding-20 content-centered">
          <Loader color="pattern" />
        </div>
      )
      }
    </>
  );
}

const mapStateToProps = state => {
  return {
    tvShow: state.tvShows.currentTvShow,
    tvShowSimilar: state.tvShows.currentTvShowSimilar,
    tvShowRecommendations: state.tvShows.currentTvShowRecommendations,
  };
}

const mapDispatchToProps = {
  fetchCurrentTvShow,
  fetchCurrentTvShowRecommendations,
  fetchCurrentTvShowSimilar
}

export default connect(mapStateToProps, mapDispatchToProps)(TvShows);
