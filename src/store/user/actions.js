import axios from 'axios';
import { SET_LOCATION } from './types';

export const setLocation = () => {
  console.log('in location');
  return async (dispatch) => {
    const res = await axios.get('https://extreme-ip-lookup.com/json/');

    const location = {
      country: 'USA',
      countryCode: 'US',
    };

    if (res.status < 300) {
      location.country = res.data.country || location.country;
      location.countryCode = res.data.countryCode || location.country_code;
    }

    dispatch({
      type: SET_LOCATION,
      payload: location,
    });
  }
}
