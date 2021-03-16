import { SET_LOCATION, SET_LANGUAGE } from './types';
import userState from './state';

export const reducer = (state = userState, action) => {
  switch (action.type) {
    case SET_LOCATION:
      return {...state, location: action.payload};
    case SET_LANGUAGE:
      return {...state, language: action.payload};
    default:
      return state;
  }
}
