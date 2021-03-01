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
            <p className="rating-score">{media.vote_average.toFixed(1)}/<span className="gray small-text">10</span></p>
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
        {media.genres.map((genre, index) => {
          const separator = index === media.genres.length - 1 ? '' : ',';

          return (
            <p
              className="genre is-primary nes-text"
              key={genre.id}>
              {`${genre.name}${separator} `}
            </p>
          );
        })
        }
      </div>
    );
  }

  const renderCountries = () => {
    return (
      <div className="countries">
        {media.production_countries.map((country, index) => {
          const separator = index === media.production_countries.length - 1 ? '' : ',';

          return (
            <p className="country nes-text is-primary" key={country.iso_3166_1}>
              {`${country.name}${separator} `}
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

  const renderCreatedBy = () => {
    return (
      <div className="created-by mt-20">
        <span className="small-text gray">
          Created by:
        </span>
        {media.created_by.map((author, index) => {
          const separator = index === media.created_by.length - 1 ? '' : ',';

          return (
            <span
              className="nes-text is-primary small-text"
              key={author.id}
            >
              {` ${author.name}${separator}`}
            </span>
          );
        })
        }
      </div>
    );
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

        {media.type && (
            <div className="type mt-10">
              {media.type}
            </div>
          )
        }

        {media.runtime && (
          <div className="duration mt-20">
            {countDuration(media.runtime)}
          </div>
        )}

        <div className="mt-30">
          {renderGenres()}

          {renderCountries()}
        </div>

        {renderCompanies()}

        {media.created_by && renderCreatedBy()}

        {media.budget && media.revenue && renderBudget()}

        {media.release_date && (
          <div className={`release-date mt-30 nes-text ${getReleaseDateColorClass()}`}>
            {generateDatestring(media.release_date)}
          </div>
          )
        }

        {media.first_air_date && (
            <div className={`release-date mt-30 nes-text ${getReleaseDateColorClass()}`}>
              {generateDatestring(media.first_air_date)}
            </div>
          )
        }

        {media.status && (
          <div className="status mt-10">
            {media.status}
          </div>
        )}
      </div>

      <div className="media-card-details-secondary">
        <div className="overview mt-40">
          {media.overview}
        </div>
        <div className="homepage mt-30 nes-text is-primary">
          <a href={media.homepage} target="_blank">
            Homepage
          </a>
        </div>
      </div>
    </div>
  );
}

export default MediaCard;
