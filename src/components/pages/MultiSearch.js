import { connect } from 'react-redux';
import {
  searchByTerm,
} from '../../store/search/actions';
import routes from '../navigation/routes';
import SearchByTerm from '../search/SearchByTerm';
import { MULTI } from '../../config/searchByFiltersTypes';

const navigationItems = [
  {
    href: routes.moviesSearch,
    text: 'Extended Movies Search'
  },
  {
    href: routes.tvShowsSearch,
    text: 'Extended Tv Shows Search'
  },
  {
    href: routes.peopleSearch,
    text: 'Search by People'
  },
  {
    href: routes.companiesSearch,
    text: 'Search by Companies'
  },
];

const MultiSearch = ({
  searchByTerm,
}) => {

  return (
    <SearchByTerm
      searchInit={searchByTerm.bind(null, MULTI)}
      navigationItems={navigationItems}
    />
  );
}

const mapDispatchToProps = {
  searchByTerm,
}

export default connect(null, mapDispatchToProps)(MultiSearch);
