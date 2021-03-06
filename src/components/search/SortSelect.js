import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setSortOrder, setSortType } from '../../store/search/actions';
import Button from '../ui/Button';
import Dropdown from '../base/Dropdown';
import useWindowResize, { tablet } from '../../hooks/useWindowResize';
import { useTranslation } from 'react-i18next';

const SortSelect = ({
  sortType,
  sortOrder,
  setSortType,
  setSortOrder,
  initSearchWithFilters,
  sortTypes = [],
}) => {
  const [ t ] = useTranslation(['sortSelect', 'searchSortTypes']);
  const [windowWidth] = useWindowResize();
  const [isMobileLayout, setIsMobileLayout] = useState(false);
  const [prevSortType, setPrevSortType] = useState(sortType);
  const [prevSortOrder, setPrevSortOrder] = useState(sortOrder);

  useEffect(() => {
    if (prevSortOrder !== sortOrder) {
      initSearchWithFilters();
      setPrevSortOrder(sortOrder);
    }
  }, [sortOrder]);

  useEffect(() => {
    if (prevSortType !== sortType) {
      initSearchWithFilters();
      setPrevSortType(sortType);
    }
  }, [sortType]);

  const findDropdownValue = () => {
    const selectedValue = sortTypes.find((type) => {
      return type.value === sortType;
    });

    return selectedValue.label;
  }

  const [dropdownSelectedValue, setDropdownSelectedValue] = useState(findDropdownValue());

  useEffect(() => {
    setDropdownSelectedValue(findDropdownValue());
  }, [sortType]);

  const selectSortType = (type) => {
    setSortType(type);
  }

  useEffect(() => {
    if (windowWidth <= tablet) {
      setIsMobileLayout(true);
    } else {
      setIsMobileLayout(false);
    }
  }, [windowWidth]);

  return (
    <div className="sort-select">
      <div className="sort-select-types">
        { isMobileLayout ? (
          <Dropdown
            title={t('dropdownTitle')}
            items={sortTypes}
            selectedValue={dropdownSelectedValue}
            onSelectItem={selectSortType}
            localize={true}
          />
        ) : (
          <>
            {sortTypes.map((type) => {
              return (
                <div
                  className={`sort-select-types-item small-text gray ${type.value === sortType ? 'selected' : ''}`}
                  key={type.value}
                  onClick={() => {
                    selectSortType(type.value);
                  }}
                >
                  {t(`searchSortTypes:${type.label}`)}
                </div>
              );
            })}
          </>
        ) }
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
