import { useEffect, useState, useContext } from 'react';
import Container from '../base/Container';
import config from '../../config';
import Loader from '../base/Loader';
import Carousel from '../ui/Carousel';
import routes from '../navigation/routes';
import makeUrl from '../../helpers/makeUrl';
import Spinner from '../base/Spinner';
import ThemeContext from '../../contexts/ThemeContext';

const types = {
  movies: 'movies',
  tvShows: 'tv-shows',
}

const { nes, basic } = config.themes;

const mapSlides = (items, type) => {
  return items.map((item) => {
    const id = item.id;

    return {
      id,
      poster: `${config.api.urls.dbImages}${item.poster_path}`,
      title: item.title || item.name,
      linkTo: type === types.movies ? makeUrl(routes.movies, { id }) : makeUrl(routes.tvShows, { id })
    }
  });
}

const MediaCarousel = ({title, containerTheme, containerClass, slidesPerPage, items, type = types.movies, loadMoreData}) => {
  const { theme } = useContext(ThemeContext);

  slidesPerPage = slidesPerPage || 5;

  const [slides, setSlides] = useState(mapSlides(items));
  const [currentSlides, setCurrentSlides] = useState([]);
  const [firstCurrentSlideIndex, setFirstCurrentSlideIndex] = useState(0);
  const [lastCurrentSlideIndex, setLastCurrentSlideIndex] = useState(firstCurrentSlideIndex + slidesPerPage);
  const [currentDataLoadPage, setCurrentDataLoadPage] = useState(1);
// TODO: fix currentSlides after langiage changing issue
  useEffect(() => {
    console.log('items', mapSlides(items, type).length);
    setSlides(mapSlides(items, type));
  }, [items]);

  useEffect(() => {
    setLastCurrentSlideIndex(firstCurrentSlideIndex + slidesPerPage);
  }, [slidesPerPage]);

  useEffect(() => {
    setCurrentSlides(slides.slice(firstCurrentSlideIndex, lastCurrentSlideIndex));
  }, [slides, firstCurrentSlideIndex, lastCurrentSlideIndex]);

  useEffect(() => {
    if (currentDataLoadPage === 1) {
      return;
    }

    loadMoreData(currentDataLoadPage);
  }, [currentDataLoadPage])

  const next = () => {
    const newFirstCurrentSlideIndex = lastCurrentSlideIndex;

    setFirstCurrentSlideIndex(newFirstCurrentSlideIndex);
    setLastCurrentSlideIndex(newFirstCurrentSlideIndex + slidesPerPage);

    setCurrentDataLoadPage(currentDataLoadPage + 1);
  }

  const prev = () => {
    let newFirstCurrentSlideIndex = firstCurrentSlideIndex - slidesPerPage;
    if (newFirstCurrentSlideIndex < 0) {
      newFirstCurrentSlideIndex = 0;
    }

    setFirstCurrentSlideIndex(newFirstCurrentSlideIndex);
    setLastCurrentSlideIndex(lastCurrentSlideIndex - slidesPerPage);
  }

  const renderLoader = () => {
    if (theme === nes) {
      return <Loader color='success' />
    }

    if (theme === basic) {
      return (
        <div className="w-100 content-centered">
          <Spinner />
        </div>
      );
    }
  }

  return (
    <Container
      theme={containerTheme}
      title={title}
      customClass={containerClass}
      >
      {!slides.length ? (
        <>
          {renderLoader()}
        </>
        ) : (
        <Carousel
          slides={currentSlides}
          totalSlidesCnt={slides.length}
          firstCurrentSlideIndex={firstCurrentSlideIndex}
          lastCurrentSlideIndex={lastCurrentSlideIndex}
          slidesPerView={slidesPerPage}
          next={next}
          prev={prev}
        />
      )}
    </Container>
  );
}

export default MediaCarousel;
