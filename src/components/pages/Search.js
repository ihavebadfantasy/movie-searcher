import {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { binaryRadioItems } from '../../helpers/forms/radioItems';
import { toggleSelectedRadio } from '../../helpers/forms/toggleSelectedRadio';
import { toggleCheckbox } from '../../helpers/forms/toggleCheckbox';
import SearchInput from '../search/SearchInput';
import Sidebar from '../base/Sidebar';
import Container from '../base/Container';
import CheckboxFilter from '../search/CheckboxFilter';
import RadioFilter from '../search/RadioFilter';
import Button from '../ui/Button';
import { searchByFilters } from '../../store/search/actions';
import { fetchTMDBCountries } from '../../store/app/actions';
import ratingItems from '../../config/ratingItems';
import findSelectedItems from '../../helpers/forms/findSelectedItems';
import mapItemsToQueryString from '../../helpers/forms/mapItemsToQueryString';
import Loader from '../base/Loader';
import MediaCardLight from '../media/MediaCardLight';

let genresRadioItems = JSON.stringify(binaryRadioItems);
genresRadioItems = JSON.parse(genresRadioItems);

let countriesRadioItems = JSON.stringify(binaryRadioItems);
countriesRadioItems = JSON.parse(countriesRadioItems);

// TODO: add years filter and loading
// TODO: find a way to add release types loading a filtering
// TODO: find a way search by countries filter
// TODO: add strict search mode with radio filters in countries checkbox and genres checkbox

const Search = ({searchByFilters, genres, fetchTMDBCountries, countries, isSearching, results}) => {
  const [genresCheckboxes, setGenresCheckboxes] = useState([]);
  const [genresRadios, setGenresRadios] = useState(genresRadioItems);
  const [countriesCheckboxes, setCountriesCheckboxes] = useState([]);
  const [countriesRadios, setCountriesRadios] = useState(countriesRadioItems);
  const [ratingRadios, setRatingRadios] = useState(ratingItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchInputFocused, setIsSearchInputFocused] = useState(false);


  useEffect(() => {
    if (countries.length === 0) {
      fetchTMDBCountries();
    }
  }, []);

  useEffect(() => {
    initSearch();
  }, [searchTerm]);

  const onKeyPress = (event) => {
    if(event.key === 'Enter' && !isSearchInputFocused){
      initSearch();
    }
  }

  const initSearch = () => {
    const params = {};

    const selectedCountries = mapItemsToQueryString(findSelectedItems(countriesCheckboxes, 'checked'), 'value');
    const selectedGenres = mapItemsToQueryString(findSelectedItems(genresCheckboxes, 'checked'), 'value');
    const selectedRating = mapItemsToQueryString(findSelectedItems(ratingRadios, 'checked'), 'value');

    if (selectedGenres.length > 0) {
      params['with_genres'] = selectedGenres;
    }

    if (selectedRating.length > 0) {
      params['vote_count.gte'] = selectedRating;
    }

    if (!searchTerm) {
      searchByFilters(params);
    }
  }

  useEffect(() => {
    const checkboxes = genres.map((genre) => {
      return {
        value: genre.id,
        label: genre.name,
        checked: false,
      }
    });

    setGenresCheckboxes(checkboxes);
  }, [genres]);

  useEffect(() => {
    const checkboxes = countries.map((country) => {
      return {
        value: country.iso_3166_1,
        label: country.english_name,
        checked: false,
      }
    });

    setCountriesCheckboxes(checkboxes);
  }, [countries]);

  const renderResults = () => {
    if (isSearching) {
      return (
        <div className="full-screen content-centered">
          <Loader />
        </div>
      );
    }

    if (results.length) {
      return (
        <Container
          theme={['withTitle']}
          title="Results"
          customClass="mt-60-resp light-border"
        >
          <div className="flex-wrapper">
            {results.map((result) => {
              return (
                <Link
                  to={`/movies/${result.id}`}
                  key={result.id}
                  className="flex-child"
                >
                  <MediaCardLight
                    title={result.title}
                    img={result.poster_path}
                  />
                </Link>
              );
            })}
          </div>
        </Container>
      );
    }
  }

  return (
    <div className="sidebar-page" onKeyPress={onKeyPress}>
      <Sidebar>
        <Container
          theme={['withTitle']}
          title="Genre"
          customClass="mb-30"
        >
          {/*<RadioFilter*/}
          {/*  items={genresRadios}*/}
          {/*  toggleSelected={(value) => {*/}
          {/*    setGenresRadios(toggleSelectedRadio(genresRadios, value));*/}
          {/*  }}*/}
          {/*  name="genrenazi"*/}
          {/*  text="Search for content with ONLY selected genres in genres list"*/}
          {/*/>*/}

          <CheckboxFilter
            checkboxes={genresCheckboxes}
            toggleCheckbox={(value) => {
              setGenresCheckboxes(toggleCheckbox(genresCheckboxes, value));
            }}
          />
        </Container>

        {/*<Container*/}
        {/*  theme={['withTitle']}*/}
        {/*  title="Country"*/}
        {/*  customClass="mb-30"*/}
        {/*>*/}
        {/*  <RadioFilter*/}
        {/*    items={countriesRadios}*/}
        {/*    toggleSelected={(value) => {*/}
        {/*      setCountriesRadios(toggleSelectedRadio(countriesRadios, value));*/}
        {/*    }}*/}
        {/*    name="countrynazi"*/}
        {/*    text="Search for content with ONLY selected countries from countries list"*/}
        {/*  />*/}

        {/*  <CheckboxFilter*/}
        {/*    checkboxes={countriesCheckboxes}*/}
        {/*    toggleCheckbox={(value) => {*/}
        {/*      setCountriesCheckboxes(toggleCheckbox(countriesCheckboxes, value));*/}
        {/*    }}*/}
        {/*  />*/}
        {/*</Container>*/}

        <Container
          theme={['withTitle']}
          title="Rating"
          customClass="mb-30"
        >
          <p className="small-text gray">Not less than:</p>
          <RadioFilter
            items={ratingRadios}
            toggleSelected={(value) => {
              setRatingRadios(toggleSelectedRadio(ratingRadios, value));
            }}
            width="100%"
          />
        </Container>

        <Button
          customClass="w-100"
          text="Search"
          onClick={initSearch}
        />
      </Sidebar>

      <div className="pd-20 w-70">
        <SearchInput
          setSearchTerm={setSearchTerm}
          setIsFocused={setIsSearchInputFocused}
        />

        { renderResults() }
      </div>
    </div>

  );
}

const mapStateToProps = state => {
  return {
    results: state.search.results,
    genres: state.movies.genres,
    countries: state.app.tmdbCountries,
    isSearching: state.search.isSearching,
  }
}

const mapDispatchToProps = {
  searchByFilters,
  fetchTMDBCountries,
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
