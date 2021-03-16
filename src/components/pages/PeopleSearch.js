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
    text: 'multiSearch'
  },
  {
    href: routes.moviesSearch,
    text: 'moviesSearch'
  },
  {
    href: routes.tvShowsSearch,
    text: 'tvShowsSearch'
  },
  {
    href: routes.companiesSearch,
    text: 'companiesSearch'
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
