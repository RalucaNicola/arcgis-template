import { CountryState, setSelectedCountry, setSelectedCountryFinishedLoading } from './countrySelectionSlice';
import { getCountriesLayer, getGlobalView } from '../../globals/view';
import { AppDispatch } from '../../storeConfiguration';
import { applyFeatureHighlight, removeFeatureHighlight } from './highlightLayer';
import { Polygon } from '@arcgis/core/geometry';
import { layerConfig } from '../../../config';
import { setError } from '../error-messaging/errorSlice';

export const highlightCountryFromMap = (payload: CountryState) => async (dispatch: AppDispatch) => {
  const { name, geometry } = payload;
  dispatch(setSelectedCountry({ name }));
  if (name) {
    try {
      applyFeatureHighlight(geometry);
      dispatch(setSelectedCountryFinishedLoading());
    } catch (error) {
      dispatch(setError({ name: error.name, message: 'Country not found.' }));
    }
  } else {
    removeFeatureHighlight();
    dispatch(setSelectedCountryFinishedLoading());
  }
};

export const highlightCountryFromList = (payload: CountryState) => async (dispatch: AppDispatch) => {
  const view = getGlobalView();
  const layer = getCountriesLayer();
  const { name } = payload;
  dispatch(setSelectedCountry({ name }));

  if (name) {
    try {
      const result = await layer.queryFeatures({
        where: `${layerConfig.field} = '${name}'`,
        returnGeometry: true,
        outFields: [layerConfig.field]
      });
      if (result.features.length > 0) {
        const [feature] = result.features;
        applyFeatureHighlight(feature.geometry as Polygon);
        const { extent } = feature.geometry;
        const expand = extent.width < 15000000 && extent.height < 15000000;
        view?.goTo(
          {
            target: expand ? extent.expand(1.7) : extent
          },
          { animate: false }
        );
      } else {
        dispatch(setError({ name: 'Country not found.', message: 'No results returned from the query' }));
      }
      dispatch(setSelectedCountryFinishedLoading());
    } catch (error) {
      dispatch(setSelectedCountryFinishedLoading());
      dispatch(setError({ name: 'Country not found.', message: error.details.messages[0] }));
    }
  } else {
    removeFeatureHighlight();
    dispatch(setSelectedCountryFinishedLoading());
  }
};
