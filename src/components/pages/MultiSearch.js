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
    text: 'moviesSearch'
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
