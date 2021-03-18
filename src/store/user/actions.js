import axios from 'axios';
import { SET_LOCATION, SET_LANGUAGE } from './types';
import { Api as TMDBApi } from '../../api/tmdb/Api';

export const setLocation = () => {
  return async (dispatch) => {
    const location = {
      country: 'USA',
      countryCode: 'US',
    };

    try {
      const res = await axios.get('https://extreme-ip-lookup.com/json/');

      location.country = res.data.country || location.country;
      location.countryCode = res.data.countryCode || location.country_code;
    } catch (err) {

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
