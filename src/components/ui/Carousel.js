import { useState, useEffect, useCallback, useContext } from 'react';
import { Animated } from 'react-animated-css';
import { Link } from 'react-router-dom';
import Button from './Button';
import ThemeContext from '../../contexts/ThemeContext';
import config from '../../config';
import { ReactComponent as BasicNextArrow } from '../../assets/images/basicNextArrow.svg';
import { ReactComponent as BasicPrevArrow } from '../../assets/images/basicPrevArrow.svg';
// TODO: add sliding animation for slider instead of fade
const { nes, basic } = config.themes;

const BASIC_THEME_ANIMATION_DURATION = 600;
const NES_THEME_ANIMATION_DURATION = 700;

const Carousel = ({ slides, next, prev, totalSlidesCnt, firstCurrentSlideIndex, lastCurrentSlideIndex, slidesPerView}) => {
  const { theme } = useContext(ThemeContext);
  const [isVisible, setIsVisible] = useState(true);
  const [slideWidth, setSlideWidth] = useState('0px');

  useEffect(() => {
    const animationDuration = theme === nes ? NES_THEME_ANIMATION_DURATION : BASIC_THEME_ANIMATION_DURATION;

    if (!isVisible) {
      setTimeout(() => {
        setIsVisible(true);
      }, animationDuration);
    }
  }, [isVisible]);

  const getFontSize = (str) => {
    const words = str.split(' ');

    let fontSize = theme === nes ? '14px' : '16px';

    if (str.length > 25) {
      return theme === nes ? '11px' : '13px';
    }

    if (str.length > 20) {
      return theme === nes ? '13px' : '15px';
    }

    words.forEach((word) => {
      if (word.length > 13) {
        fontSize = theme === nes ? '11px' : '13px';

        return;
      }

      if (word.length > 10) {
        fontSize = theme === nes ? '13px' : '15px';
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
      { theme === nes ? (
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
        ) : (
        <button
          className="uk-slidenav-large uk-icon uk-slidenav-prev uk-slidenav"
          onClick={() => {
            setIsVisible(false);
            prev();
          }}
          disabled={isPrevBtnDisabled}
        >
          <BasicPrevArrow />
        </button>
        )
      }

      <div
        className="carousel-content-wrapper"
        ref={sliderContentRef}
      >
        { theme === nes ? (
          <Animated
            animationIn="flipInX"
            isVisible={isVisible}
            animationInDuration={NES_THEME_ANIMATION_DURATION}
            className="carousel-content"
          >
            {renderedSlides}
          </Animated>
          ) : (
          <Animated
            animationIn="fadeIn"
            animateOnMount={false}
            isVisible={isVisible}
            animationInDuration={BASIC_THEME_ANIMATION_DURATION}
            className="carousel-content"
          >
            {renderedSlides}
          </Animated>
          )
        }
      </div>

      { theme === nes ? (
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
        ) : (
        <button
          className="uk-slidenav-large uk-icon uk-slidenav-next uk-slidenav"
          onClick={() => {
            setIsVisible(false);
            next();
          }}
          disabled={isNextBtnDisabled}
        >
          <BasicNextArrow />
        </button>
        )
      }
    </div>
  );
}

export default Carousel;
