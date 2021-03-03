const iconSizes = {
  small: 'is-small',
  medium: 'is-medium',
  large: 'is-large',
}

const Rating = ({voteAverage, voteCount, iconSize = 'large'}) => {
  const renderRating = () => {
    if (voteAverage && voteCount > 0) {
      return (
        <div className="rating">
          { voteAverage > 5 ? (<i className={`nes-icon ${iconSizes[iconSize]} star`} />) : (<i className="nes-icon star is-half" />)}
          <div className="score">
            <p className="rating-score">{voteAverage.toFixed(1)}/<span className="gray small-text">10</span></p>
            <p className="rating-vote-count gray">({voteCount})</p>
          </div>
        </div>
      );
    }
    return (
      <div className="rating">
        <i className={`nes-icon ${iconSizes[iconSize]} star is-empty`} />
        <div className="score">
          <p className="rating-score">0/<span className="gray small-text">10</span></p>
          <p className="rating-vote-count gray">(0)</p>
        </div>
      </div>
    );
  }
  return (
    <>
      {renderRating()}
    </>
  );
}

export default Rating;
