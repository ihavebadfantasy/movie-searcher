import { useState, useEffect, useCallback } from 'react';
import { Animated } from 'react-animated-css';

const Carousel = ({ slides, next, prev, totalSlidesCnt, firstCurrentSlideIndex, lastCurrentSlideIndex, slidesPerView }) => {
  // TODO: fix animation
  const [isVisible, setIsVisible] = useState(true);
  const [slideWidth, setSlideWidth] = useState('0px');

  const sliderContentRef = useCallback((node) => {
    if (node) {
      const containerWidth = node.getBoundingClientRect().width;
      const marginLeft = 30;

      const childWidth = containerWidth / slidesPerView - marginLeft;

      setSlideWidth(`${childWidth * 100 / containerWidth}%`)
    }
  }, [slidesPerView]);

  const renderedSlides = slides.map((slide) => {
    return (
      <div
        className="carousel-slide"
        key={slide.id}
        style={{width: slideWidth}}
      >
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
  const isNextBtnDisabled = lastCurrentSlideIndex >= totalSlidesCnt;

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
      <div
        className="carousel-content-wrapper"
        ref={sliderContentRef}
      >
      <Animated
        animationIn="flipInX"
        isVisible={isVisible}
        animationInDuration={700}
        className="carousel-content"
      >
          {renderedSlides}
      </Animated>
      </div>

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
