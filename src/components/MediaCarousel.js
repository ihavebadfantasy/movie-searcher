import {useEffect, useState} from 'react';
import axios from 'axios';
import Container from './Container';
import config from '../config';
import Loader from './Loader';
import Carousel from './Carousel';

const mapSlides = (items) => {
  return items.map((item) => {
    return {
      id: item.id,
      poster: `${config.api.urls.dbImages}${item.poster_path}`,
      title: item.original_title,
    }
  });
}

const MediaCarousel = ({title, containerTheme, containerClass, slidesPerPage}) => {
  slidesPerPage = slidesPerPage || 5;

  const [slides, setSlides] = useState([]);
  const [currentSlides, setCurrentSlides] = useState([]);
  const [firstCurrentSlideIndex, setFirstCurrentSlideIndex] = useState(0);
  const [lastCurrentSlideIndex, setLastCurrentSlideIndex] = useState(firstCurrentSlideIndex + slidesPerPage);

  useEffect(() => {
    const fetchSlidesData = async () => {
      const res = await axios.get(`${config.api.urls.db}/discover/movie`, {
        params: {
          'api_key': config.api.keys.db,
        }
      });

      setTimeout(() => {
        const data = res.data.results;
        setSlides(mapSlides(data));

        console.log(res.data);
      }, 500)
    }

    fetchSlidesData();
  }, []);

  useEffect(() => {
    setLastCurrentSlideIndex(firstCurrentSlideIndex + slidesPerPage);
  }, [slidesPerPage])

  useEffect(() => {
    setCurrentSlides(slides.slice(firstCurrentSlideIndex, lastCurrentSlideIndex));
  }, [slides, firstCurrentSlideIndex, lastCurrentSlideIndex]);

  const next = () => {
    const newFirstCurrentSlideIndex = lastCurrentSlideIndex;

    setFirstCurrentSlideIndex(newFirstCurrentSlideIndex);
    setLastCurrentSlideIndex(newFirstCurrentSlideIndex + slidesPerPage);
  }

  const prev = () => {
    let newFirstCurrentSlideIndex = firstCurrentSlideIndex - slidesPerPage;
    if (newFirstCurrentSlideIndex < 0) {
      newFirstCurrentSlideIndex = 0;
    }

    setFirstCurrentSlideIndex(newFirstCurrentSlideIndex);
    setLastCurrentSlideIndex(lastCurrentSlideIndex - slidesPerPage);
  }

  return (
    <Container
      theme={containerTheme}
      title={title}
      customClass={containerClass}
      >
      {!slides.length ? (<Loader color='success' />) : (
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
