import { csv } from 'd3';
import { AppDispatch } from '../../storeConfiguration';
import { setEutrophicationDataLoaded, setLoadingError } from './loadingSlice';
import {
  setEutrophicationCountryData,
  setEutrophicationDataMonthly,
  setEutrophicationDataYearly
} from '../../globals/eutrophicationData';

export const fetchEutrophicationData = () => async (dispatch: AppDispatch) => {
  try {
    const countryData = await csv('./data/country_regions.csv');
    const yearlyData = await csv('./data/impact_data_total.csv');
    const monthlyData = await csv('./data/impact_data_monthly.csv');
    if (countryData && yearlyData && monthlyData) {
      setEutrophicationCountryData(countryData);
      setEutrophicationDataYearly(yearlyData);
      setEutrophicationDataMonthly(monthlyData);

      dispatch(setEutrophicationDataLoaded({ eutrophicationDataLoaded: true }));
    }
  } catch (error) {
    dispatch(
      setLoadingError({
        error: {
          message: error.message,
          name: 'Loading eutrophication data failed'
        }
      })
    );
  }
};
