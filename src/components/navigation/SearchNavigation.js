import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearAllSearchStore } from '../../store/search/actions';
import Button from '../ui/Button';
import reactor from '../../helpers/reactor/Reactor';
import { SEARCH_NAVIGATION_TOGGLE } from '../../helpers/reactor/events';
import routes from './routes';
import { useTranslation } from 'react-i18next';

const SearchNavigation = ({clearAllSearchStore, items}) => {
  const [ t ] = useTranslation('searchNavigation');

  const [isClosed, setIsClosed] = useState(false);

  const history = useHistory();

  const onLinkClick = (e) => {
    e.preventDefault();

    const path = e.target.href.slice(e.target.href.indexOf(routes.search));

    clearAllSearchStore();
    history.push(path);
  }

  const toggleNavigation = () => {
    setIsClosed(!isClosed);
    setTimeout(() => {
      reactor.dispatchEvent(SEARCH_NAVIGATION_TOGGLE);
    }, 400);
  }

  const renderNavigationLinks = () => {
    return items.map((item) => {
      return (
        <li
          key={item.href}
          className="search-navigation-item"
        >
          <a
            href={item.href}
            onClick={onLinkClick}
          >
            {t(item.text)}
          </a>
        </li>
      );
    })
  }
  return (
    <div className={`search-navigation-wrapper mb-60-resp ${isClosed ? 'closed' : ''}`}>
      <Button
        text="&#8593;"
        customClass="search-navigation-up-btn"
        onClick={toggleNavigation}
      />

      <ul className="nes-list is-circle search-navigation">

        {renderNavigationLinks()}
      </ul>
    </div>
  );
}

const mapDispatchToProps = {
  clearAllSearchStore,
}

export default connect(null, mapDispatchToProps)(SearchNavigation);
