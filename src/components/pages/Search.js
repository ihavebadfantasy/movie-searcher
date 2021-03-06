import {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { binaryRadioItems } from '../../helpers/forms/radioItems';
import { toggleSelectedRadio } from '../../helpers/forms/toggleSelectedRadio';
import { toggleCheckbox } from '../../helpers/forms/toggleCheckbox';
import SearchInput from '../forms/SearchInput';
import Sidebar from '../base/Sidebar';
import Container from '../base/Container';
import Checkbox from '../forms/Checkbox';
import Radio from '../forms/Radio';
import { searchByFilters, setResultsCurrentPage } from '../../store/search/actions';
import { fetchTMDBCountries } from '../../store/app/actions';
import ratingItems from '../../config/ratingItems';
import findSelectedItems from '../../helpers/forms/findSelectedItems';
import mapItemsToQueryString from '../../helpers/forms/mapItemsToQueryString';
import SearchResults from '../search/SearchResults';
import resetAllSelectedCheckboxesAndRadios from '../../helpers/forms/resetAllSelectedCheckboxesAndRadios';
import ControlButtons from '../search/ControlButtons';
import Pagination from '../ui/Pagination';

let genresRadioItems = JSON.stringify(binaryRadioItems);
genresRadioItems = JSON.parse(genresRadioItems);

let countriesRadioItems = JSON.stringify(binaryRadioItems);
countriesRadioItems = JSON.parse(countriesRadioItems);

// TODO: add years filter and loading
// TODO: find a way to add release_types loading and filtering
// TODO: find a way search by countries filter
// TODO: add strict search mode with radio filters in countries checkbox and genres checkbox

const Search = ({
  searchByFilters,
  genres,
  fetchTMDBCountries,
  countries,
  isSearching,
  results,
  setResultsCurrentPage,
  resultsCurrentPage,
  resultsTotalPages
}) => {
  const [genresCheckboxes, setGenresCheckboxes] = useState([]);
  const [genresRadios, setGenresRadios] = useState(genresRadioItems);
  const [countriesCheckboxes, setCountriesCheckboxes] = useState([]);
  const [countriesRadios, setCountriesRadios] = useState(countriesRadioItems);
  const [ratingRadios, setRatingRadios] = useState(ratingItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchInputFocused, setIsSearchInputFocused] = useState(false);
  const [minVoteCountValue, setMinVoteCountValue] = useState('');


  useEffect(() => {
    if (countries.length === 0) {
      fetchTMDBCountries();
    }

    return () => {
      resetAllFilters();
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

  const initSearch = (page = resultsCurrentPage || 1, overideResults = false) => {
    setResultsCurrentPage(page);

    const params = {};

    // const selectedCountries = mapItemsToQueryString(findSelectedItems(countriesCheckboxes, 'checked'), 'value');
    const selectedGenres = mapItemsToQueryString(findSelectedItems(genresCheckboxes, 'checked'), 'value');
    const selectedRating = mapItemsToQueryString(findSelectedItems(ratingRadios, 'checked'), 'value');

    if (selectedGenres.length > 0) {
      params['with_genres'] = selectedGenres;
    }

    if (selectedRating.length > 0) {
      params['vote_average.gte'] = selectedRating;
    }

    if (minVoteCountValue) {
      params['vote_count.gte'] = minVoteCountValue;
    }

    if (!searchTerm) {
      searchByFilters(params, overideResults);
    }
  }

  const loadResults = (overrideResults, page) => {
    initSearch(page, overrideResults);
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

  const resetAllFilters = () => {
    setCountriesCheckboxes(resetAllSelectedCheckboxesAndRadios(countriesCheckboxes));
    setGenresCheckboxes(resetAllSelectedCheckboxesAndRadios(genresCheckboxes));
    setRatingRadios(resetAllSelectedCheckboxesAndRadios(ratingRadios));
    setMinVoteCountValue('');
  }

  return (
    <div className="sidebar-page" onKeyPress={onKeyPress}>
      <Sidebar>
        <Container
          theme={['withTitle']}
          title="Genre"
          customClass="mb-30"
        >
          {/*<Radio*/}
          {/*  items={genresRadios}*/}
          {/*  toggleSelected={(value) => {*/}
          {/*    setGenresRadios(toggleSelectedRadio(genresRadios, value));*/}
          {/*  }}*/}
          {/*  name="genrenazi"*/}
          {/*  text="Search for content with ONLY selected genres in genres list"*/}
          {/*/>*/}

          <Checkbox
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
        {/*  <Radio*/}
        {/*    items={countriesRadios}*/}
        {/*    toggleSelected={(value) => {*/}
        {/*      setCountriesRadios(toggleSelectedRadio(countriesRadios, value));*/}
        {/*    }}*/}
        {/*    name="countrynazi"*/}
        {/*    text="Search for content with ONLY selected countries from countries list"*/}
        {/*  />*/}

        {/*  <Checkbox*/}
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
          <Radio
            items={ratingRadios}
            toggleSelected={(value) => {
              setRatingRadios(toggleSelectedRadio(ratingRadios, value));
            }}
            width="100%"
          />
        </Container>

        <Container
          theme={['withTitle']}
          title="Min Vote Count"
          customClass="mb-30"
        >
          <p className="small-text gray">The minimum amount of people that voted the film:</p>
          <input
            type="number"
            value={minVoteCountValue}
            onChange={(e) => {
              setMinVoteCountValue(e.target.value);
            }}
            className="nes-input light-border"
          />
        </Container>

        <ControlButtons
          onReset={resetAllFilters}
          onSearch={initSearch}
        />
      </Sidebar>

      <div className="pd-20 w-70">
        <SearchInput
          setSearchTerm={setSearchTerm}
          setIsFocused={setIsSearchInputFocused}
        />

        <SearchResults
          isSearching={isSearching}
          results={results}
        />

        <Pagination
          showMore={loadResults.bind(null, false, resultsCurrentPage + 1)}
          totalPages={resultsTotalPages}
          currentPage={resultsCurrentPage}
          switchPage={loadResults.bind(null, true)}
        />
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
    resultsCurrentPage: state.search.resultsCurrentPage,
    resultsTotalPages: state.search.resultsTotalPages,
  }
}

const mapDispatchToProps = {
  searchByFilters,
  fetchTMDBCountries,
  setResultsCurrentPage,
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
