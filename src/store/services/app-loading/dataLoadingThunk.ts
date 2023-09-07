import { csv } from 'd3';
import { AppDispatch } from '../../storeConfiguration';
import { setCountryDataLoaded } from './loadingSlice';
import { setError } from '../error-messaging/errorSlice';
import { setCountryData } from '../map/countryLayer';

export const fetchCountryData = () => async (dispatch: AppDispatch) => {
  try {
    const countryData = await csv('./data/countries.csv');
    if (countryData) {
      setCountryData(countryData);
      dispatch(setCountryDataLoaded(true));
    }
  } catch (error) {
    dispatch(
      setError({
        message: error.message,
        name: 'Loading country data failed'
      })
    );
  }
};
