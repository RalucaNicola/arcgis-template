import { FC, useEffect, useState } from 'react';
import MapView from '@arcgis/core/views/MapView';
import { regionNames } from '../../config';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import { getSimpleRenderer, getSelectionRenderer } from '../../utils/utils';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/storeConfiguration';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import Graphic from '@arcgis/core/Graphic';
import { zoomToCountry } from '../../store/services/country-selection/country-thunk';
interface GraphicHit {
  graphic: Graphic;
}
interface Props {
  view?: MapView;
}

const CountriesLayer: FC<Props> = ({ view }: Props) => {
  const [eezLayer, setEezLayer] = useState<FeatureLayer | null>(null);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (view) {
      const eezLayer = view.map.layers
        .filter((layer) => layer.title === 'Exclusive Economic Zone boundaries')
        .getItemAt(0) as FeatureLayer;
      eezLayer.outFields = regionNames.map((region) => region.field);
      eezLayer.renderer = getSimpleRenderer();
      setEezLayer(eezLayer);
    }
  }, [view]);

  // add event listener for country selection
  useEffect(() => {
    if (view && eezLayer) {
      const listener = view.on('click', async (event) => {
        const result = await view.hitTest(event, { include: [eezLayer] });
        if (result.results && result.results.length > 0) {
          const graphic = (result.results[0] as GraphicHit).graphic;
          const newCountrySelection = graphic.attributes['CountryName'];
          if (newCountrySelection) {
            dispatch(zoomToCountry({ name: newCountrySelection, selectedFromMap: true }));
          }
        } else {
          dispatch(zoomToCountry({ name: null, selectedFromMap: false }));
        }
      });

      return () => {
        listener.remove();
      };
    }
  }, [view, eezLayer]);

  return null;
};

export default CountriesLayer;
