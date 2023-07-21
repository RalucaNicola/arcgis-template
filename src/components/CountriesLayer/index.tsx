import { FC, useEffect, useState } from 'react';
import MapView from '@arcgis/core/views/MapView';
import { layerConfig } from '../../config';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import Graphic from '@arcgis/core/Graphic';
import { highlightCountryFromMap } from '../../store/services/country-selection/countrySelectionThunk';
import { createHighlightLayer } from '../../store/services/country-selection/highlightLayer';
import { Polygon } from '@arcgis/core/geometry';

interface GraphicHit {
  graphic: Graphic;
}
interface Props {
  view?: MapView;
}

const CountriesLayer: FC<Props> = ({ view }: Props) => {
  const [countriesLayer, setCountriesLayer] = useState<FeatureLayer | null>(null);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (view) {
      const countriesLayer = view.map.layers
        .filter((layer) => layer.title === layerConfig.title)
        .getItemAt(0) as FeatureLayer;
      countriesLayer.outFields = [layerConfig.field];
      setCountriesLayer(countriesLayer);
      // create layer used to highlight the selected country
      createHighlightLayer();
    }
  }, [view]);

  // add event listener for country selection
  useEffect(() => {
    if (view && countriesLayer) {
      const listenerClick = view.on('click', async (event) => {
        const result = await view.hitTest(event, { include: [countriesLayer] });
        if (result.results && result.results.length > 0) {
          const graphic = (result.results[0] as GraphicHit).graphic;
          const newCountrySelection = graphic.attributes[layerConfig.field];
          if (newCountrySelection) {
            dispatch(highlightCountryFromMap({ name: newCountrySelection, geometry: graphic.geometry as Polygon }));
          }
        } else {
          dispatch(highlightCountryFromMap({ name: null }));
        }
      });

      const listenerHover = view.on('pointer-move', async (event) => {
        const result = await view.hitTest(event, { include: [countriesLayer] });
        if (result.results && result.results.length > 0) {
          view.container.style.cursor = 'pointer';
        } else {
          view.container.style.cursor = 'default';
        }
      });
      return () => {
        listenerClick.remove();
        listenerHover.remove();
      };
    }
  }, [view, countriesLayer]);

  return null;
};

export default CountriesLayer;
