import generateArrayInRange from '../helpers/generateArrayInRange';
import mapToCheckboxOrRadioItems from '../helpers/mapToCheckboxOrRadioItems';

const MIN_RATING = 0;
const MAX_RATING = 10;

export default mapToCheckboxOrRadioItems(generateArrayInRange(MIN_RATING, MAX_RATING));
