import { useEffect } from 'react';
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
  language,
  searchTerm,
}) => {
  useEffect(() => {
    if (searchTerm) {
      searchByTerm(PEOPLE, true, false, false, true);
    }
  }, [language]);

  return (
    <SearchByTerm
      searchInit={searchByTerm.bind(null, PEOPLE)}
      navigationItems={navigationItems}
      searchType={PEOPLE}
    />
  );
}

const mapStateToProps = (state) => {
  return {
    language: state.user.language,
    searchTerm: state.search.searchTerm,
  }
}

const mapDispatchToProps = {
  searchByTerm,
}

export default connect(mapStateToProps, mapDispatchToProps)(PeopleSearch);
