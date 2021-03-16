import {useEffect} from 'react';
import { connect } from 'react-redux';
import SearchNavigation from '../navigation/SearchNavigation';
import {
  setGenresCheckboxes,
  setYearsCheckboxes,
} from '../../store/search/actions';
import tvShowsYearsItems from '../../config/tvShowsYearsItems';
import MediaSearch from '../search/MediaSearch';
import routes from '../navigation/routes';
import { TV_SHOWS } from '../../config/searchByFiltersTypes';
import tvShowsExtendedSearchSortTypes from '../../config/tvShowsExtendedSearchSortTypes';

const navigationItems = [
  {
    href: routes.search,
    text: 'multiSearch'
  },
  {
    href: routes.moviesSearch,
    text: 'moviesSearch'
  },
  {
    href: routes.peopleSearch,
    text: 'peopleSearch'
  },
  {
    href: routes.companiesSearch,
    text: 'companiesSearch'
  },
];

const TvShowsSearch = ({
  genres,
  setGenresCheckboxes,
  genresCheckboxes,
  yearsCheckboxes,
  setYearsCheckboxes,
}) => {
  useEffect(() => {
    if (genresCheckboxes.length === 0) {
      const checkboxes = genres.map((genre) => {
        return {
          value: genre.id,
          label: genre.name,
          checked: false,
        }
      });

      setGenresCheckboxes(checkboxes);
    }
  }, [genres]);

  useEffect(() => {
    if (yearsCheckboxes.length < 1) {
      const years = JSON.parse(JSON.stringify(tvShowsYearsItems));
      setYearsCheckboxes(years);
    }
  }, []);

  return (
    <div className="mt-30 base-container pb-60-resp">
      <SearchNavigation
        items={navigationItems}
      />
      <MediaSearch
        paginationCustomClass="mobile-left-margin"
        resultsCustomClass="thin"
        searchType={TV_SHOWS}
        sortTypes={tvShowsExtendedSearchSortTypes}
      />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    genres: state.tvShows.genres,
    genresCheckboxes: state.search.genresCheckboxes,
    yearsCheckboxes: state.search.yearsCheckboxes,
  }
}

const mapDispatchToProps = {
  setGenresCheckboxes,
  setYearsCheckboxes,
}

export default connect(mapStateToProps, mapDispatchToProps)(TvShowsSearch);
