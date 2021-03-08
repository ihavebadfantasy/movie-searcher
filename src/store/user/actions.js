import axios from 'axios';
import { SET_LOCATION } from './types';

export const setLocation = () => {
  return async (dispatch) => {
    // TODO: (bug) fix if cors crash (check out mozilla);
    const res = await axios.get('https://extreme-ip-lookup.com/json/');

    const location = {
      country: 'USA',
      countryCode: 'US',
    };

    if (res && res.status < 300) {
      location.country = res.data.country || location.country;
      location.countryCode = res.data.countryCode || location.country_code;
    }

    dispatch({
      type: SET_LOCATION,
      payload: location,
    });
  }
}
