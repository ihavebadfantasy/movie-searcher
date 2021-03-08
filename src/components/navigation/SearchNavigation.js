import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearAllSearchStore } from '../../store/search/actions';
import Button from '../ui/Button';

const SearchNavigation = ({clearAllSearchStore, items}) => {
  const [isClosed, setIsClosed] = useState(false);

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
    <div className={`search-navigation-wrapper mb-60-resp ${isClosed ? 'closed' : ''}`}>
      <Button
        text="&#8593;"
        customClass="search-navigation-up-btn"
        onClick={() => {
          setIsClosed(!isClosed);
        }}
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
