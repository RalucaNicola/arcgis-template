import { CountryState, setSelectedCountry, setSelectedCountrySuccess, setSelectedCountryError } from './country-slice';
import { getCountriesLayer, getGlobalView } from '../../globals/view';
import { AnyAction, PayloadAction } from '@reduxjs/toolkit';
import { getSelectionRenderer, getSimpleRenderer } from '../../../utils/utils';
import { AppDispatch } from '../../storeConfiguration';

export const zoomToCountry = (payload: CountryState) => async (dispatch: AppDispatch) => {
  const view = getGlobalView();
  const layer = getCountriesLayer();
  const { name, selectedFromMap } = payload;
  dispatch(setSelectedCountry({ name, selectedFromMap }));

  if (name) {
    layer.renderer = getSelectionRenderer('CountryName', name);
    if (!selectedFromMap) {
      try {
        const result = await layer.queryFeatures({
          where: `CountryName = '${name}'`,
          returnGeometry: true,
          outFields: ['CountryName']
        });
        if (result.features.length > 0) {
          const feature = result.features[0];
          const extent = feature.geometry.extent;
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
      dispatch(setSelectedCountrySuccess());
    }
  } else {
    layer.renderer = getSimpleRenderer();
    dispatch(setSelectedCountrySuccess());
  }
};
