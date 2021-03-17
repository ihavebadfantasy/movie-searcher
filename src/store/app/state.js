import config from '../../config';

export default {
  isInitialDataLoaded: false,
  tmdbCountries: [],
  tmdbJobs: [],
  theme: localStorage.getItem('themeType') || config.themes.basic,
}
