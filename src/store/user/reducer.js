import { SET_LOCATION } from './types';
import userState from './state';

export const reducer = (state = userState, action) => {
  switch (action.type) {
    case SET_LOCATION:
      return {...state, location: action.payload};
    default:
      return state;
  }
}
