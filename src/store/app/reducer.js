import appState from './state';
import { LOAD_INITIAL_APP_DATA } from './types';

export const reducer = (state = appState, action) => {
  switch (action.type) {
    case LOAD_INITIAL_APP_DATA:
      return {...state, isInitialDataLoaded: true};
    default:
      return state;
  }
}
