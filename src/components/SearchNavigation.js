import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearAllSearchStore } from '../store/search/actions';

const SearchNavigation = ({clearAllSearchStore, items}) => {
  const history = useHistory();

  const onLinkClick = (e) => {
    e.preventDefault();

    const path = e.target.href.slice(e.target.href.indexOf('/search'));

    clearAllSearchStore();
    history.push(path);
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
            {item.text}
          </a>
        </li>
      );
    })
  }

  return (
    <ul className="nes-list is-circle mb-60-resp search-navigation">
      {renderNavigationLinks()}
    </ul>
  );
}

const mapDispatchToProps = {
  clearAllSearchStore,
}

export default connect(null, mapDispatchToProps)(SearchNavigation);
