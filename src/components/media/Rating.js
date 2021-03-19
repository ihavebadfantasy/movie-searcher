import { useContext } from 'react';
import ThemeContext from '../../contexts/ThemeContext';
import { FcRating } from "react-icons/fc";
import config from '../../config';

const { nes, basic } = config.themes;

const iconSizes = {
  small: 'is-small',
  medium: 'is-medium',
  large: 'is-large',
}

const Rating = ({voteAverage, voteCount, iconSize = 'large'}) => {
  const { theme } = useContext(ThemeContext);

  const renderIcon = () => {
    if (theme === basic) {
      return (
        <FcRating className="rating-icon" />
      );
    }

    if (theme === nes && voteAverage && voteCount > 0) {
      if (voteAverage > 5) {
        return (<i className={`nes-icon ${iconSizes[iconSize]} star`} />)
      } else {
        return (<i className="nes-icon star is-half" />);

      }

      return (<i className={`nes-icon ${iconSizes[iconSize]} star is-empty`} />);
    }
  }

  const renderRating = () => {
    if (voteAverage && voteCount > 0) {
      return (
        <div className="rating">
          { renderIcon() }
          <div className="score">
            <p className="rating-score">{voteAverage.toFixed(1)}/<span className="gray small-text">10</span></p>
            <p className="rating-vote-count gray">({voteCount})</p>
          </div>
        </div>
      );
    }
    return (
      <div className="rating">
        { renderIcon() }
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
