import {useEffect} from 'react';
import { connect } from 'react-redux';
import SearchNavigation from '../navigation/SearchNavigation';
import {
  setGenresCheckboxes,
  setYearsCheckboxes,
} from '../../store/search/actions';
import moviesYearsItems from '../../config/moviesYearsItems';
import MediaSearch from '../search/MediaSearch';
import routes from '../navigation/routes';
import { MOVIES } from '../../config/searchByFiltersTypes';
import moviesExtendedSearchSortTypes from '../../config/moviesExtendedSearchSortTypes';

const navigationItems = [
  {
    href: routes.search,
    text: 'multiSearch'
  },
  {
    href: routes.tvShowsSearch,
    text: 'tvShowsSearch'
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

const MoviesSearch = ({
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
      const years = JSON.parse(JSON.stringify(moviesYearsItems));
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
        searchType={MOVIES}
        sortTypes={moviesExtendedSearchSortTypes}
      />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    genres: state.movies.genres,
    genresCheckboxes: state.search.genresCheckboxes,
    yearsCheckboxes: state.search.yearsCheckboxes,
  }
}

const mapDispatchToProps = {
  setGenresCheckboxes,
  setYearsCheckboxes,
}

export default connect(mapStateToProps, mapDispatchToProps)(MoviesSearch);
