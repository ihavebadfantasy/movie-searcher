import { useState, useEffect, useCallback } from 'react';
import { Animated } from 'react-animated-css';
import { Link } from 'react-router-dom';
import Button from './Button';

const Carousel = ({ slides, next, prev, totalSlidesCnt, firstCurrentSlideIndex, lastCurrentSlideIndex, slidesPerView}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [slideWidth, setSlideWidth] = useState('0px');

  const getFontSize = (str) => {
    const words = str.split(' ');

    let fontSize = '14px';

    if (str.length > 25) {
      return '11px';
    }

    if (str.length > 20) {
      return '13px';
    }

    words.forEach((word) => {
      if (word.length > 13) {
        fontSize = '11px';

        return;
      }

      if (word.length > 10) {
        fontSize = '13px';
      }
    })

    return fontSize;
  }

  const sliderContentRef = useCallback((node) => {
    if (node) {
      const containerWidth = node.getBoundingClientRect().width;
      const marginLeft = 30;

      const childWidth = containerWidth / slidesPerView - marginLeft;

      setSlideWidth(`${childWidth * 100 / containerWidth}%`)
    }
  }, [slidesPerView]);

  const renderedSlides = slides.map((slide) => {
    const innerContent = (
      <>
        <div className="carousel-slide-img">
          <img alt={slide.title} src={slide.poster} />
        </div>
        <h4
          className="carousel-slide-title"
          style={{fontSize: getFontSize(slide.title)}}
        >
          {slide.title}
        </h4>
      </>
    );

    return slide.linkTo ? (
      <Link
        to={slide.linkTo}
        className="carousel-slide"
        key={slide.id}
        style={{width: slideWidth}}
      >
        {innerContent}
      </Link>
    ) : (
      <div
        className="carousel-slide"
        key={slide.id}
        style={{width: slideWidth}}
      >
        {innerContent}
      </div>
    );
  });

  const isPrevBtnDisabled = firstCurrentSlideIndex === 0;
  const isNextBtnDisabled = lastCurrentSlideIndex >= totalSlidesCnt;

  useEffect(() => {
    if (!isVisible) {
      setIsVisible(true);
    }
  }, [isVisible]);

  return (
    <div className="carousel">
      <Button
        color="white"
        customClass={isPrevBtnDisabled ? 'nes-btn is-disabled' : 'nes-btn'}
        onClick={() => {
          setIsVisible(false);
          prev();
        }}
        disabled={isPrevBtnDisabled}
        text="<"
      />
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

      <Button
        color="white"
        customClass={isNextBtnDisabled ? 'nes-btn is-disabled' : 'nes-btn'}
        onClick={() => {
          setIsVisible(false);
          next();
        }}
        disabled={isNextBtnDisabled}
        text=">"
      />
    </div>
  );
}

export default Carousel;
