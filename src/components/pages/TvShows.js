import {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { fetchCurrentTvShow } from '../../store/tvShows/actions';
import Container from '../base/Container';
import Loader from '../base/Loader';
import MediaCard from '../media/MediaCard';
import Accordion from '../ui/Accordion';
import generateDatestring from '../../helpers/generateDatestring';

const mapSeasonsToAccordionItems = (seasons) => {
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

const TvShows = ({tvShow, fetchCurrentTvShow, match}) => {
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

  const setSelectedSeason = (id) => {
    const seasons = seasonsAccordionItems.map((season) => {
      if (season.id === id) {
        season.selected = !season.selected;
      } else {
        season.selected = false;
      }

      return season;
    });

    setSeasonsAccordionItems(seasons);
  }

  return (
    <div className="base-container mt-60-resp">
      { tvShow ? (
        <Container
          theme={['withTitle']}
          title={tvShow.title}
        >
          <MediaCard media={tvShow} type="tv-shows">
            <div className="mt-30">
              <Accordion
                items={seasonsAccordionItems}
                setSelected={setSelectedSeason}
              />
            </div>
          </MediaCard>
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
