import {useState} from 'react';
import SearchInput from './SearchInput';
import Sidebar from './Sidebar';
import Container from './Container';
import CheckboxFilter from './CheckboxFilter';

const typeItems = [
  {
    value: 'movies',
    label: 'Movies',
    checked: false,
  },
  {
    value: 'tvShows',
    label: 'TV-Shows',
    checked: false,
  },
];

const toggleCheckbox = (checkboxes, value) => {
  return checkboxes.map((checkbox) => {
    if (checkbox.value === value) {
      checkbox.checked = !checkbox.checked;
    }

    return checkbox;
  });
}

const Search = () => {
  const [typeCheckboxes, setTypeCheckboxes] = useState(typeItems);

  return (
    <div className="sidebar-page">
      <Sidebar>
        <Container
          theme={['withTitle']}
          title="Type"
          customClass="mb-30"
        >
          <CheckboxFilter
            checkboxes={typeCheckboxes}
            toggleCheckbox={(value) => {
              setTypeCheckboxes(toggleCheckbox(typeCheckboxes, value));
            }}
          />
        </Container>
      </Sidebar>

      <div>
        <SearchInput />
      </div>
    </div>
  );
}

export default Search;
