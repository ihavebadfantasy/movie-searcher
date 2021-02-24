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

const MediaCarousel = ({title, containerTheme, containerClass}) => {
  const [slides, setSlides] = useState([]);

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
      }, 500)
    }

    fetchSlidesData();
  }, [])

  return (
    <Container
      theme={containerTheme}
      title={title}
      customClass={containerClass}
      >
      {!slides.length ? (<Loader color='success' />) : (
        <Carousel
          slides={slides}
        />
      )}
    </Container>
  );
}

export default MediaCarousel;
