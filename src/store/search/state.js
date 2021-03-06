import ratingItems from '../../config/ratingItems';
import yearsItems from '../../config/yearsItems';

export default {
  results: [],
  isSearching: false,
  resultsTotalPages: null,
  resultsTotalCnt: null,
  resultsCurrentPage: null,
  genresCheckboxes: [],
  ratingRadios: ratingItems,
  searchTerm: '',
  minVoteCountValue: '',
  countriesCheckboxes: [],
  searchWasRequested: false,
  yearsCheckboxes: yearsItems,
}
