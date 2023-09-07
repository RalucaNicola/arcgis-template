import { CountryState, setSelectedCountry, setSelectedCountryFinishedLoading } from './countrySelectionSlice';
import { AppDispatch } from '../../storeConfiguration';
import { applyFeatureHighlight, removeFeatureHighlight } from './highlightLayer';
import { Polygon } from '@arcgis/core/geometry';
import { layerConfig } from '../../../config';
import { setError } from '../error-messaging/errorSlice';
import { setCountryToHashParameters } from '../../../utils/URLHashParams';
import { getView } from '../map/view';
import { getCountriesLayer } from '../map/countryLayer';

export const highlightCountryFromMap = (payload: CountryState) => async (dispatch: AppDispatch) => {
  const { name, geometry } = payload;
  dispatch(setSelectedCountry({ name }));
  if (name) {
    try {
      applyFeatureHighlight(geometry);
      setCountryToHashParameters(name);
    } catch (error) {
      dispatch(setError({ name: error.name, message: 'Country not found.' }));
      setCountryToHashParameters(null);
    }
  } else {
    removeFeatureHighlight();
    setCountryToHashParameters(null);
  }
  dispatch(setSelectedCountryFinishedLoading());
};

export const highlightCountryFromList = (payload: CountryState) => async (dispatch: AppDispatch) => {
  const view = getView();
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
        setCountryToHashParameters(name);
      } else {
        setCountryToHashParameters(null);
        dispatch(setError({ name: 'Country not found.', message: 'No results returned from the query' }));
      }
    } catch (error) {
      setCountryToHashParameters(null);
      dispatch(setError({ name: 'Country not found.', message: error.details.messages[0] }));
    }
  } else {
    setCountryToHashParameters(null);
    removeFeatureHighlight();
  }
  dispatch(setSelectedCountryFinishedLoading());
};

export const highlightCountryAtStart = (payload: CountryState) => async (dispatch: AppDispatch) => {
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
      } else {
        setCountryToHashParameters(null);
        dispatch(setError({ name: 'Country not found.', message: 'No results returned from the query' }));
      }
    } catch (error) {
      setCountryToHashParameters(null);
      dispatch(setError({ name: 'Country not found.', message: error.details.messages[0] }));
    }
  } else {
    removeFeatureHighlight();
  }
  dispatch(setSelectedCountryFinishedLoading());
};
