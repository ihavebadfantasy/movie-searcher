import personState from './state';
import { FETCH_CURRENT_PERSON } from './types';

export const reducer = (state = personState, action) => {
  switch (action.type) {
    case FETCH_CURRENT_PERSON:
      return {...state, currentPerson: action.payload};
    default:
      return state;
  }
}
