import { useState, useEffect } from 'react';
import { Animated } from 'react-animated-css';

const Carousel = ({ slides, next, prev, totalSlidesCnt, firstCurrentSlideIndex, lastCurrentSlideIndex }) => {
  const [isVisible, setIsVisible] = useState(true);

  const renderedSlides = slides.map((slide) => {
    return (
      <div className="carousel-slide" key={slide.id}>
        <div className="carousel-slide-img">
          <img alt={slide.title} src={slide.poster} />
        </div>
        <h4>
          {slide.title}
        </h4>
      </div>
    );
  });

  const isPrevBtnDisabled = firstCurrentSlideIndex === 0;
  const isNextBtnDisabled = lastCurrentSlideIndex === totalSlidesCnt;

  useEffect(() => {
    if (!isVisible) {
      setIsVisible(true);
    }
  }, [isVisible])

  return (
    <div className="carousel">
      <button
        type="button"
        className={isPrevBtnDisabled ? 'nes-btn is-disabled' : 'nes-btn'}
        onClick={() => {
          setIsVisible(false);
          prev();
        }}
        disabled={isPrevBtnDisabled}
      >
        {'<'}
      </button>
      <Animated
        animationIn="flipInX"
        className="carousel-content"
        isVisible={isVisible}
        animationInDuration={700}
      >
          {renderedSlides}
      </Animated>
      <button
        type="button"
        className={isNextBtnDisabled ? 'nes-btn is-disabled' : 'nes-btn'}
        onClick={() => {
          setIsVisible(false);
          next();
        }}
        disabled={isNextBtnDisabled}
      >
        {'>'}
      </button>
    </div>
  );
}

export default Carousel;
