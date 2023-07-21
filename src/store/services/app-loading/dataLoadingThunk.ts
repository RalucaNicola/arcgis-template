import { csv } from 'd3';
import { AppDispatch } from '../../storeConfiguration';
import { setCountryDataLoaded } from './loadingSlice';
import { setCountryData } from '../../globals/countryData';
import { setError } from '../error-messaging/errorSlice';

export const fetchCountryData = () => async (dispatch: AppDispatch) => {
  try {
    const countryData = await csv('./data/countries.csv');
    if (countryData) {
      setCountryData(countryData);
      dispatch(setCountryDataLoaded(true));
    }
  } catch (error) {
    console.log(error.message);
    dispatch(
      setError({
        message: error.message,
        name: 'Loading country data failed'
      })
    );
  }
};
