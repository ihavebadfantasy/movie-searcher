import axios from 'axios';
import { SET_LOCATION, SET_LANGUAGE } from './types';
import { Api as TMDBApi } from '../../api/tmdb/Api';

export const setLocation = () => {
  return async (dispatch) => {
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

export const setLanguage = (language) => {
  TMDBApi.$instance.setLanguage(language);

  return {
    type: SET_LANGUAGE,
    payload: language,
  }
}
