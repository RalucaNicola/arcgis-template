import { CountryState, setSelectedCountry, setSelectedCountrySuccess, setSelectedCountryError } from './countrySlice';
import { getCountriesLayer, getGlobalView } from '../../globals/view';
import { AppDispatch } from '../../storeConfiguration';
import { applyFeatureHighlight, removeFeatureHighlight } from './highlightLayer';
import { Polygon } from '@arcgis/core/geometry';

export const highlightCountryFromMap = (payload: CountryState) => async (dispatch: AppDispatch) => {
  const { name, geometry } = payload;
  dispatch(setSelectedCountry({ name }));
  if (name) {
    try {
      applyFeatureHighlight(geometry);
      dispatch(setSelectedCountrySuccess());
    } catch (error) {
      dispatch(setSelectedCountryError(error));
    }
  } else {
    removeFeatureHighlight();
    dispatch(setSelectedCountrySuccess());
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
        where: `CountryName = '${name}'`,
        returnGeometry: true,
        outFields: ['CountryName']
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
      }
      dispatch(setSelectedCountrySuccess());
    } catch (error) {
      dispatch(setSelectedCountryError(error));
    }
  } else {
    removeFeatureHighlight();
    dispatch(setSelectedCountrySuccess());
  }
};
