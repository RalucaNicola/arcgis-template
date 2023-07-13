import { FC, useEffect, useState } from 'react';
import MapView from '@arcgis/core/views/MapView';
import { regionNames } from '../../config';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import { getSimpleRenderer } from '../../utils/utils';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import Graphic from '@arcgis/core/Graphic';
import { highlightCountryFromMap } from '../../store/services/country-selection/countryThunk';
import { createHighlightLayer } from '../../store/services/country-selection/highlightLayer';
import { Polygon } from '@arcgis/core/geometry';

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
      // create layer used to highlight the selected country
      createHighlightLayer();
    }
  }, [view]);

  // add event listener for country selection
  useEffect(() => {
    if (view && eezLayer) {
      const listener = view.on('click', async (event) => {
        const result = await view.hitTest(event, { include: [eezLayer] });
        if (result.results && result.results.length > 0) {
          const graphic = (result.results[0] as GraphicHit).graphic;
          console.log(graphic);
          const newCountrySelection = graphic.attributes['CountryName'];
          if (newCountrySelection) {
            dispatch(highlightCountryFromMap({ name: newCountrySelection, geometry: graphic.geometry as Polygon }));
          }
        } else {
          dispatch(highlightCountryFromMap({ name: null }));
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
