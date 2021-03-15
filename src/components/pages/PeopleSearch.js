import { connect } from 'react-redux';
import {
  searchByTerm,
} from '../../store/search/actions';
import routes from '../navigation/routes';
import SearchByTerm from '../search/SearchByTerm';
import { PEOPLE } from '../../config/searchByFiltersTypes';

const navigationItems = [
  {
    href: routes.search,
    text: 'Multi Search'
  },
  {
    href: routes.moviesSearch,
    text: 'Extended Movies Search'
  },
  {
    href: routes.tvShowsSearch,
    text: 'Extended Tv Shows Search'
  },
  {
    href: routes.companiesSearch,
    text: 'Search by Companies'
  },
];

const PeopleSearch = ({
  searchByTerm,
}) => {

  return (
    <SearchByTerm
      searchInit={searchByTerm.bind(null, PEOPLE)}
      navigationItems={navigationItems}
      searchType={PEOPLE}
    />
  );
}

const mapDispatchToProps = {
  searchByTerm,
}

export default connect(null, mapDispatchToProps)(PeopleSearch);
