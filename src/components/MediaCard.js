import config from '../config';
import { DateTime } from 'luxon';
import countDuration from '../helpers/countDuration';
import generateDatestring from '../helpers/generateDatestring';
import generateMoneyString from '../helpers/generateMoneyString';

const MediaCard = ({media}) => {
  const renderRating = () => {
    if (media.vote_average && media.vote_count > 0) {
      return (
        <div className="rating">
          { media.vote_average > 5 ? (<i className="nes-icon is-large star" />) : (<i className="nes-icon star is-half" />)}
          <div className="score">
            <p className="rating-score">{media.vote_average.toFixed(2)}/<span className="gray small-text">10</span></p>
            <p className="rating-vote-count gray">({media.vote_count})</p>
          </div>
        </div>
      );
    }
    return (
      <div className="rating">
        <i className="nes-icon is-large star is-large is-empty" />
        <div className="score">
          <p className="rating-score">0/<span className="gray small-text">10</span></p>
          <p className="rating-vote-count gray">(0)</p>
        </div>
      </div>
    );
  }

  const renderGenres = () => {
    return (
      <div className="genres">
        {media.genres.map((genre) => {
          return (
            <p className="genre is-primary nes-text" key={genre.id}>
              {genre.name}
            </p>
          );
        })}
      </div>
    );
  }

  const renderCountries = () => {
    return (
      <div className="countries">
        {media.production_countries.map((country) => {
          return (
            <p className="country nes-text is-primary" key={country.iso_3166_1}>
              {country.name}
            </p>
          );
        })}
      </div>
    );
  }

  const renderCompanies = () => {
    return (
      <div className="companies mt-20">
        {media.production_companies.map((company) => {
          return (
            <div className="company-wrapper" key={company.id}>
              <div className="company-img-wrapper">
                <img src={`${config.api.urls.dbImages}${company.logo_path}`} alt={company.name} />
              </div>
              <p className="company">
                {company.name}
              </p>
            </div>
          );
        })}
      </div>
    );
  }

  const renderBudget = () => {
    return (
      <div className="budget mt-30">
        <i className="nes-icon coin is-large" />

        <div className="budget-text">
          <p>
            <span className="small-text gray">budget: </span>
            {generateMoneyString(media.budget)}
          </p>
          <p>
            <span className="small-text gray">revenue: </span>
            {generateMoneyString(media.revenue)}
          </p>
        </div>
      </div>
    );
  }

  const getReleaseDateColorClass = () => {
    const releaseDate = DateTime.fromISO(media.release_date);
    const dateNow = DateTime.now();

    return releaseDate > dateNow ? 'is-warning' : 'is-success';
  }

  return (
    <div className="media-card">
      <p className="media-card-tagline gray mb-30">{media.tagline}</p>
      <div className="media-card-poster">
        <img
          alt={media.title}
          src={`${config.api.urls.dbImages}${media.poster_path}`}
        />
      </div>

      <div className="media-card-details">
        {renderRating()}

        <div className="duration mt-20">
          {countDuration(media.runtime)}
        </div>

        <div className="mt-30">
          {renderGenres()}

          {renderCountries()}
        </div>

        {renderCompanies()}

        {renderBudget()}

        <div className={`release-date mt-30 nes-text ${getReleaseDateColorClass()}`}>
          {generateDatestring(media.release_date)}
        </div>
      </div>

      <div className="media-card-details-secondary">
        <div className="overview mt-40">
          {media.overview}
        </div>

      </div>
    </div>
  );
}

export default MediaCard;
