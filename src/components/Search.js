import {useState, useEffect} from 'react';
import axios from 'axios';
import config from '../config';
import { binaryRadioItems } from '../helpers/forms/radioItems';
import { toggleSelectedRadio } from '../helpers/forms/toggleSelectedRadio';
import { toggleCheckbox } from '../helpers/forms/toggleCheckbox';
import SearchInput from './SearchInput';
import Sidebar from './Sidebar';
import Container from './Container';
import CheckboxFilter from './CheckboxFilter';
import RadioFilter from './RadioFilter';

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

let genresRadioItems = JSON.stringify(binaryRadioItems);
genresRadioItems = JSON.parse(genresRadioItems);

let countriesRadioItems = JSON.stringify(binaryRadioItems);
countriesRadioItems = JSON.parse(countriesRadioItems);

const Search = () => {
  const [typeCheckboxes, setTypeCheckboxes] = useState(typeItems);
  const [genres, setGenres] = useState([]);
  const [genresCheckboxes, setGenresCheckboxes] = useState([]);
  const [genresRadios, setGenresRadios] = useState(genresRadioItems);
  const [countries, setCountries] = useState([]);
  const [countriesCheckboxes, setCountriesCheckboxes] = useState([]);
  const [countriesRadios, setCountriesRadios] = useState(countriesRadioItems);

  useEffect(() => {
    const fetchGenres = async () => {
      const res = await axios.get(`${config.api.urls.db}/genre/movie/list`, {
        params: {
          'api_key': config.api.keys.db,
        }
      });

      setGenres(res.data.genres);
    }

    const fetchCountries = async () => {
      const res = await axios.get(`${config.api.urls.db}/configuration/countries`, {
        params: {
          'api_key': config.api.keys.db,
        }
      });

      setCountries(res.data);
    }

    fetchGenres();
    fetchCountries();
  }, []);

  useEffect(() => {
    const checkboxes = genres.map((genre) => {
      return {
        value: genre.id,
        label: genre.name,
        checked: false,
      }
    });

    setGenresCheckboxes(checkboxes);
  }, [genres])

  useEffect(() => {
    const checkboxes = countries.map((country) => {
      return {
        value: country.iso_3166_1,
        label: country.english_name,
        checked: false,
      }
    });

    setCountriesCheckboxes(checkboxes);
  }, [countries])

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

        <Container
          theme={['withTitle']}
          title="Genre"
          customClass="mb-30"
        >
          <RadioFilter
            items={genresRadios}
            toggleSelected={(value) => {
              setGenresRadios(toggleSelectedRadio(genresRadios, value));
            }}
            name="genrenazi"
            text="Search for content with ONLY selected genres in genres list"
          />

          <CheckboxFilter
            checkboxes={genresCheckboxes}
            toggleCheckbox={(value) => {
              setGenresCheckboxes(toggleCheckbox(genresCheckboxes, value));
            }}
          />
        </Container>

        <Container
          theme={['withTitle']}
          title="Country"
          customClass="mb-30"
        >
          <RadioFilter
            items={countriesRadios}
            toggleSelected={(value) => {
              setCountriesRadios(toggleSelectedRadio(countriesRadios, value));
            }}
            name="countrynazi"
            text="Search for content with ONLY selected countries from countries list"
          />

          <CheckboxFilter
            checkboxes={countriesCheckboxes}
            toggleCheckbox={(value) => {
              setCountriesCheckboxes(toggleCheckbox(countriesCheckboxes, value));
            }}
          />
        </Container>
      </Sidebar>

      <div className="pd-20 w-70">
        <SearchInput />
      </div>
    </div>
  );
}

export default Search;
