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
import {
  searchByFilters,
  setResultsCurrentPage,
  setMinVoteCountValue,
  setRatingRadios,
  setSearchTerm,
  setCountriesCheckboxes,
} from '../../store/search/actions';
import { fetchTMDBCountries } from '../../store/app/actions';
import SearchResults from '../search/SearchResults';
import resetAllSelectedCheckboxesAndRadios from '../../helpers/forms/resetAllSelectedCheckboxesAndRadios';
import ControlButtons from '../search/ControlButtons';
import Pagination from '../ui/Pagination';
import ratingItems from '../../config/ratingItems';

let genresRadioItems = JSON.stringify(binaryRadioItems);
genresRadioItems = JSON.parse(genresRadioItems);

let countriesRadioItems = JSON.stringify(binaryRadioItems);
countriesRadioItems = JSON.parse(countriesRadioItems);

// TODO: add search by term + filters
// TODO: change years filter to a range
// TODO: find a way to add release_types loading and filtering
// TODO: find a way search by countries filter
// TODO: add strict search mode with radio filters in countries checkbox and genres checkbox

const Search = ({
  searchByFilters,
  fetchTMDBCountries,
  countries,
  isSearching,
  results,
  setResultsCurrentPage,
  resultsCurrentPage,
  resultsTotalPages,
  setMinVoteCountValue,
  setGenresCheckboxes,
  setRatingRadios,
  setSearchTerm,
  minVoteCountValue,
  genresCheckboxes,
  countriesCheckboxes,
  searchTerm,
  ratingRadios,
  searchWasRequested,
  yearsCheckboxes,
  setYearsCheckboxes,
  paginationClass,
  resultsClass
}) => {
  const [genresRadios, setGenresRadios] = useState(genresRadioItems);
  const [countriesRadios, setCountriesRadios] = useState(countriesRadioItems);
  const [isSearchInputFocused, setIsSearchInputFocused] = useState(false);

  useEffect(() => {
    if (countries.length === 0) {
      fetchTMDBCountries();
    }
  }, []);

  useEffect(() => {
    if (results.length < 1) {
      initSearch(1, true);
    }

    if (ratingRadios.length < 1) {
      const rating = JSON.parse(JSON.stringify(ratingItems))
      setRatingRadios(rating);
    }
  }, [])

  // useEffect(() => {
  //   initSearch(1, true);
  // }, [searchTerm]);

  const onKeyPress = (event) => {
    if(event.key === 'Enter' && !isSearchInputFocused){
      initSearch(1, true);
    }
  }

  const initSearch = (page = resultsCurrentPage || 1, overrideResults = false) => {
    setResultsCurrentPage(page);
    searchByFilters(overrideResults);
  }

  const loadResults = (overrideResults, page) => {
    initSearch(page, overrideResults);
  }

  useEffect(() => {
    if (countriesCheckboxes.length === 0) {
      const checkboxes = countries.map((country) => {
        return {
          value: country.iso_3166_1,
          label: country.english_name,
          checked: false,
        }
      });

      setCountriesCheckboxes(checkboxes);
    }
  }, [countries]);

  const resetAllFilters = () => {
    setCountriesCheckboxes(resetAllSelectedCheckboxesAndRadios(countriesCheckboxes));
    setGenresCheckboxes(resetAllSelectedCheckboxesAndRadios(genresCheckboxes));
    setRatingRadios(resetAllSelectedCheckboxesAndRadios(ratingRadios));
    setMinVoteCountValue('');
  }

  return (
    <div className="sidebar-page overflow-x-hidden mt-60-resp" onKeyPress={onKeyPress}>
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

        <Container
          theme={['withTitle']}
          title="Years"
          customClass="mb-30"
        >

          {/*<Checkbox*/}
          {/*  checkboxes={yearsCheckboxes}*/}
          {/*  toggleCheckbox={(value) => {*/}
          {/*    setYearsCheckboxes(toggleCheckbox(yearsCheckboxes, value));*/}
          {/*  }}*/}
          {/*/>*/}
          <Radio
            items={yearsCheckboxes}
            toggleSelected={(value) => {
              setYearsCheckboxes(toggleSelectedRadio(yearsCheckboxes, value));
            }}
            width="100%"
          />
        </Container>

        <ControlButtons
          onReset={resetAllFilters}
          onSearch={initSearch.bind(1, true)}
        />
      </Sidebar>

      <div className="pd-20 pr-0 sidebar-page-main-content">
        {/*<SearchInput*/}
        {/*  setSearchTerm={setSearchTerm}*/}
        {/*  setIsFocused={setIsSearchInputFocused}*/}
        {/*/>*/}

        <SearchResults
          isSearching={isSearching}
          results={results}
          customClass={resultsClass}
        />

        {results.length > 0 && (
          <Pagination
            showMore={loadResults.bind(null, false, resultsCurrentPage + 1)}
            totalPages={resultsTotalPages}
            currentPage={resultsCurrentPage}
            switchPage={loadResults.bind(null, true)}
            customClass={paginationClass}
          />
        )}

        {results.length < 1 && searchWasRequested && (
          <p className="mt-60-resp gray">We are so sorry, but nothing matching your request was found. Try to change the filters or double check the spelling of search input value.</p>
        )}
      </div>
    </div>

  );
}

const mapStateToProps = state => {
  return {
    results: state.search.results,
    countries: state.app.tmdbCountries,
    isSearching: state.search.isSearching,
    resultsCurrentPage: state.search.resultsCurrentPage,
    resultsTotalPages: state.search.resultsTotalPages,
    searchTerm: state.search.searchTerm,
    minVoteCountValue: state.search.minVoteCountValue,
    countriesCheckboxes: state.search.countriesCheckboxes,
    ratingRadios: state.search.ratingRadios,
    searchWasRequested: state.search.searchWasRequested,
  }
}

const mapDispatchToProps = {
  searchByFilters,
  fetchTMDBCountries,
  setResultsCurrentPage,
  setSearchTerm,
  setRatingRadios,
  setMinVoteCountValue,
  setCountriesCheckboxes,
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
