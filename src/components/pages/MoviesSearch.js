import {useEffect} from 'react';
import { connect } from 'react-redux';
import SearchNavigation from '../navigation/SearchNavigation';
import {
  setGenresCheckboxes,
  setYearsCheckboxes,
} from '../../store/search/actions';
import moviesYearsItems from '../../config/moviesYearsItems';
import MediaSearch from '../search/MediaSearch';

const navigationItems = [
  {
    href: '/search',
    text: 'Multi Search'
  },
  {
    href: '/search/tv-shows',
    text: 'Extended Tv Shows Search'
  },
  {
    href: '/search/people',
    text: 'Search by People'
  },
  {
    href: '/search/companies',
    text: 'Search by Companies'
  },
];
// TODO: (feature) add 'Back to search results' button when the user get here from any search page
// TODO: (feature) add scroll position restoring when getting back
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
