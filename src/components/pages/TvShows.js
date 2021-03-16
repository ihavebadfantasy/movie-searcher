import { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { fetchCurrentTvShow, fetchCurrentTvShowSimilar, fetchCurrentTvShowRecommendations } from '../../store/tvShows/actions';
import Container from '../base/Container';
import Loader from '../base/Loader';
import MediaCard from '../media/MediaCard';
import Accordion from '../ui/Accordion';
import generateDatestring from '../../helpers/generateDatestring';
import setSelectedItem from '../../helpers/accordion/setSelectedItem';
import useWindowResize from '../../hooks/useWindowResize';
import FixedButton from '../ui/FixedButton';
import { useLastLocation } from 'react-router-last-location';
import routes from '../navigation/routes';
import { useTranslation } from 'react-i18next';

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

const TvShows = ({tvShow,
  fetchCurrentTvShow,
  match,
  fetchCurrentTvShowSimilar,
  fetchCurrentTvShowRecommendations,
  tvShowSimilar,
  tvShowRecommendations,
  history,
  language
}) => {
  const [ t ] = useTranslation('general');
  const [seasonsAccordionItems, setSeasonsAccordionItems] = useState([]);
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

    fetchCurrentTvShow(id, true);
  }, [match.params.id, language]);

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
        <div className="pb-60-resp">
          <Container
            theme={['withTitle']}
            title={tvShow.name}
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
                history.goBack();
              }}
            />}
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
    tvShow: state.tvShows.currentTvShow,
    tvShowSimilar: state.tvShows.currentTvShowSimilar,
    tvShowRecommendations: state.tvShows.currentTvShowRecommendations,
    language: state.user.language,
  };
}

const mapDispatchToProps = {
  fetchCurrentTvShow,
  fetchCurrentTvShowRecommendations,
  fetchCurrentTvShowSimilar
}

export default connect(mapStateToProps, mapDispatchToProps)(TvShows);
