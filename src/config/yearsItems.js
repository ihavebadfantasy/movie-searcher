import generateArrayInRange from '../helpers/generateArrayInRange';
import mapToCheckboxOrRadioItems from '../helpers/mapToCheckboxOrRadioItems';

const FIRST_FILM_RELEASE_YEAR = 1898;
const now = new Date();

export default mapToCheckboxOrRadioItems(generateArrayInRange(FIRST_FILM_RELEASE_YEAR, now.getFullYear()).reverse());

