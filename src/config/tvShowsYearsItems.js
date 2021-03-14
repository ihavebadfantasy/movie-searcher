import generateArrayInRange from '../helpers/generateArrayInRange';
import mapToCheckboxOrRadioItems from '../helpers/mapToCheckboxOrRadioItems';

const FIRST_TV_SHOW_RELEASE_YEAR = 1927;
const now = new Date();

export default mapToCheckboxOrRadioItems(generateArrayInRange(FIRST_TV_SHOW_RELEASE_YEAR, now.getFullYear()).reverse());
