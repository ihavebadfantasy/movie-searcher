import { useState, useEffect } from 'react';
import config from '../../config';
import countDuration from '../../helpers/countDuration';
import generateDatestring from '../../helpers/generateDatestring';
import generateMoneyString from '../../helpers/generateMoneyString';
import getDateColorClass from '../../helpers/getDateColorClass';
import MediaCarousel from './MediaCarousel';
import Accordion from '../ui/Accordion';
import Rating from './Rating';
import useSlidesPerPage from '../../hooks/useSlidesPerPage';
import setSelectedItem from '../../helpers/accordion/setSelectedItem';

const types = {
  movies: 'movies',
  tvShows: 'tv-shows',
}

const mapReviewsToAccordionItems = (reviews) => {
  return reviews.map((review) => {
    return {
      id: review.id,
      header: review.author,
      content: [{
        content: review.content,
        date: review.created_at,
      }],
      selected: false,
    };
  });
}

const MediaCard = ({media, children, type = types.movies, similar, loadMoreSimilar, recommendations, loadMoreRecommendations}) => {
  const [reviewsAccordionItems, setReviewsAccordionItems] = useState([]);

  const [slidesPerPage] = useSlidesPerPage(4);

  useEffect(() => {
    if (media.reviews) {
      setReviewsAccordionItems(mapReviewsToAccordionItems(media.reviews));
    }
  }, [media]);

  const setSelectedReview = setSelectedItem.bind(null, reviewsAccordionItems, setReviewsAccordionItems);

  // TODO: add images slider with lighbox to enlarge image

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
              {company.logo_path && (
                  <div className="company-img-wrapper">
                    <img src={`${config.api.urls.dbImages}${company.logo_path}`} alt={company.name} />
                  </div>
                )
              }
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

  const renderCreatedBy = () => {
    if (media.created_by.length > 0) {
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

    return null;
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
        <Rating
          voteAverage={media.vote_average}
          voteCount={media.vote_count}
        />

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

        {(media.budget && media.revenue) ? renderBudget() : null}

        {media.release_date && (
          <div className={`release-date mt-30 nes-text ${getDateColorClass(media.release_date)}`}>
            {generateDatestring(media.release_date)}
          </div>
          )
        }

        {media.last_air_date && (
            <div className={`release-date mt-30 nes-text ${getDateColorClass(media.last_air_date)}`}>
              <span className="small-text gray mr-10">Last Episode on Air:</span>
              {generateDatestring(media.last_air_date)}
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

        {children}

        {recommendations.length > 0 && (
          <MediaCarousel
            containerTheme={['withTitle']}
            containerClass="mb-30 mt-30 light-border"
            title="Recommendations"
            slidesPerPage={slidesPerPage}
            items={recommendations}
            type={type}
            loadMoreData={loadMoreRecommendations}
          />
        )}

        {similar.length > 0 && (
          <MediaCarousel
            containerTheme={['withTitle']}
            containerClass="mb-30 mt-30 light-border"
            title="Similar"
            slidesPerPage={slidesPerPage}
            items={similar}
            type={type}
            loadMoreData={loadMoreSimilar}
          />
        )}

        {reviewsAccordionItems.length > 0 && (
          <div className="mt-30">
            <Accordion
              items={reviewsAccordionItems}
              setSelected={setSelectedReview}
            />
          </div>
        )}

        {media.homepage && (
          <div className="homepage mt-30 nes-text is-primary">
            <a href={media.homepage} target="_blank">
              Homepage
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default MediaCard;
