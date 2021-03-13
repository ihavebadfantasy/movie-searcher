import { useEffect} from 'react';
import { connect } from 'react-redux';
import {
  setMinVoteCountValue,
  setRatingRadios,
  setSearchPageScrollPosition,
  scrollToSearchPageScrollPosition,
  setGenresCheckboxes,
  setYearsCheckboxes,
  setReleaseTypesCheckboxes,
} from '../../store/search/actions';
import Sidebar from '../base/Sidebar';
import Container from '../base/Container';
import Checkbox from '../forms/Checkbox';
import { toggleCheckbox } from '../../helpers/forms/toggleCheckbox';
import Radio from '../forms/Radio';
import { toggleSelectedRadio } from '../../helpers/forms/toggleSelectedRadio';
import ControlButtons from './ControlButtons';
import { binaryRadioItems } from '../../helpers/forms/radioItems';
import ratingItems from '../../config/ratingItems';
import resetAllSelectedCheckboxesAndRadios from '../../helpers/forms/resetAllSelectedCheckboxesAndRadios';
import useWindowResize, { containerWidth } from '../../hooks/useWindowResize';
import { releaseTypesItems } from '../../config/releaseTypesItems';

let genresRadioItems = JSON.stringify(binaryRadioItems);
genresRadioItems = JSON.parse(genresRadioItems);

let countriesRadioItems = JSON.stringify(binaryRadioItems);
countriesRadioItems = JSON.parse(countriesRadioItems);

const MediaSearchFilters = ({
  initSearch,
  genresCheckboxes,
  setGenresCheckboxes,
  results,
  ratingRadios,
  setRatingRadios,
  minVoteCountValue,
  setMinVoteCountValue,
  yearsCheckboxes,
  setYearsCheckboxes,
  sidebarIsClosed,
  setSidebarIsClosed,
  setScrollPosition,
  scrollToSearchPageScrollPosition,
  topScrollPosition,
  releaseTypesCheckboxes,
  setReleaseTypesCheckboxes,
}) => {
  const [windowWidth] = useWindowResize();

  useEffect(() => {
    if (results.length < 1) {
      initSearch(1, true);
    }

    if (ratingRadios.length < 1) {
      const rating = JSON.parse(JSON.stringify(ratingItems))
      setRatingRadios(rating);
    }

    if (releaseTypesCheckboxes.length < 1) {
      setReleaseTypesCheckboxes(releaseTypesItems);
    }
  }, []);

  const startSearch = () => {
    initSearch(1, true);

    if (windowWidth <= containerWidth) {
      setSidebarIsClosed(true);
    }

    setScrollPosition(topScrollPosition);
    scrollToSearchPageScrollPosition();
  }

  const resetAllFilters = () => {
    // setCountriesCheckboxes(resetAllSelectedCheckboxesAndRadios(countriesCheckboxes));
    setGenresCheckboxes(resetAllSelectedCheckboxesAndRadios(genresCheckboxes));
    setRatingRadios(resetAllSelectedCheckboxesAndRadios(ratingRadios));
    setYearsCheckboxes(resetAllSelectedCheckboxesAndRadios(yearsCheckboxes));
    setMinVoteCountValue('');
  }

  return (
    <Sidebar
      isClosed={sidebarIsClosed}
      setIsClosed={setSidebarIsClosed}
    >
      <Container
        theme={['withTitle']}
        title="Genre"
        customClass="mb-30"
      >

        <Checkbox
          checkboxes={genresCheckboxes}
          toggleCheckbox={(value) => {
            setGenresCheckboxes(toggleCheckbox(genresCheckboxes, value));
          }}
        />
      </Container>

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

        <Radio
          items={yearsCheckboxes}
          toggleSelected={(value) => {
            setYearsCheckboxes(toggleSelectedRadio(yearsCheckboxes, value));
          }}
          width="100%"
        />
      </Container>

      <Container
        theme={['withTitle']}
        title="Release Type"
        customClass="mb-30"
      >

        <Checkbox
          checkboxes={releaseTypesCheckboxes}
          toggleCheckbox={(value) => {
            setReleaseTypesCheckboxes(toggleCheckbox(releaseTypesCheckboxes, value));
          }}
        />
      </Container>

      <ControlButtons
        onReset={resetAllFilters}
        onSearch={startSearch}
      />
    </Sidebar>
  );
}

const mapStateToProps = state => {
  return {
    results: state.search.results,
    countries: state.app.tmdbCountries,
    minVoteCountValue: state.search.minVoteCountValue,
    ratingRadios: state.search.ratingRadios,
    topScrollPosition: state.search.topScrollPosition,
    genresCheckboxes: state.search.genresCheckboxes,
    yearsCheckboxes: state.search.yearsCheckboxes,
    releaseTypesCheckboxes: state.search.releaseTypesCheckboxes,
  }
}

const mapDispatchToProps = {
  setRatingRadios,
  setMinVoteCountValue,
  setScrollPosition: setSearchPageScrollPosition,
  scrollToSearchPageScrollPosition,
  setYearsCheckboxes,
  setGenresCheckboxes,
  setReleaseTypesCheckboxes,
}

export default connect(mapStateToProps, mapDispatchToProps)(MediaSearchFilters);
