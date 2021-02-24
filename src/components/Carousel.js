const Carousel = ({ slides }) => {
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
  })
  return (
    <div className="carousel">
      <div className="carousel-content">
        {renderedSlides.slice(0, 5)}
      </div>
    </div>
  );
}

export default Carousel;
