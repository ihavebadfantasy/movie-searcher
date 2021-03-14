import { connect } from 'react-redux';
import { setSortOrder, setSortType } from '../../store/search/actions';
import Button from '../ui/Button';

const sortTypes = [
  {
    label: 'Popularity',
    value: 'popularity',
  },
  {
    label: 'Vote Average',
    value: 'vote_average',
  },
  {
    label: 'Vote Count',
    value: 'vote_count',
  },
  {
    label: 'Release Date',
    value: 'primary_release_date',
  },
];

const SortSelect = ({
  sortType,
  sortOrder,
  setSortType,
  setSortOrder,
}) => {
  return (
    <div className="sort-select">
      <div className="sort-select-types">
        {sortTypes.map((type) => {
          return (
            <div
              className={`sort-select-types-item small-text gray ${type.value === sortType ? 'selected' : ''}`}
              key={type.value}
              onClick={() => {
                setSortType(type.value)
              }}
            >
              {type.label}
            </div>
          );
        })}
      </div>

      <div className="sort-select-order">
        <Button
          color={`${sortOrder === 'asc' ? 'warning' : 'primary'}`}
          text=">"
          customClass="sort-select-order-asc-btn"
          onClick={() => {
            setSortOrder('asc');
          }}
        />

        <Button
          color={`${sortOrder === 'desc' ? 'warning' : 'primary'}`}
          text=">"
          customClass="sort-select-order-desc-btn"
          onClick={() => {
            setSortOrder('desc');
          }}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    sortType: state.search.sortType,
    sortOrder: state.search.sortOrder,
  };
}

const mapDispatchToProps = {
  setSortType,
  setSortOrder,
}

export default connect(mapStateToProps, mapDispatchToProps)(SortSelect);
