import { FC, useEffect, useState } from 'react';
import MapView from '@arcgis/core/views/MapView';
import { regionNames } from '../../config';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import { getSimpleRenderer, getSelectionRenderer } from '../../utils/utils';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/storeConfiguration';

interface Props {
  view?: MapView;
}

const CountriesLayer: FC<Props> = ({ view }: Props) => {
  const [eezLayer, setEezLayer] = useState<FeatureLayer | null>(null);
  const selectedCountry = useSelector((state: RootState) => state.country);
  console.log('CountriesLayer rendered');
  // when country selection changes, update the layer renderer
  useEffect(() => {
    if (selectedCountry && eezLayer) {
      if (selectedCountry.name) {
        eezLayer.renderer = getSelectionRenderer('CountryName', selectedCountry.name);
        if (!selectedCountry.selectedFromMap) {
          eezLayer
            .queryFeatures({
              where: `CountryName = '${selectedCountry.name}'`,
              returnGeometry: true,
              outFields: ['CountryName']
            })
            .then((result) => {
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
            });
        }
      } else {
        eezLayer.renderer = getSimpleRenderer();
      }
    }
  }, [selectedCountry, eezLayer]);

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

  return null;
};

export default CountriesLayer;
