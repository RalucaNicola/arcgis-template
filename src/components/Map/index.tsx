import * as styles from './Map.module.css';
import { Children, FC, ReactElement, ReactNode, cloneElement, useEffect, useRef, useState } from 'react';
import MapView from '@arcgis/core/views/MapView';
import Graphic from '@arcgis/core/Graphic';
import { mapConfig, regionNames } from '../../config';
import WebMap from '@arcgis/core/WebMap';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import { getSimpleRenderer } from '../../utils/utils';
import { useDispatch } from 'react-redux';
import { setCountry } from '../../store/slices/country-slice';

interface MapProps {
  children?: ReactNode;
}

interface GraphicHit {
  graphic: Graphic;
}

const Map: FC<MapProps> = ({ children }: MapProps) => {
  const [view, setView] = useState<MapView | null>(null);
  const [eezLayer, setEezLayer] = useState<FeatureLayer | null>(null);
  const mapDivRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  console.log('Map rendered');

  // add event listener for country selection
  useEffect(() => {
    if (view && eezLayer) {
      const listener = view.on('click', async (event) => {
        const result = await view.hitTest(event, { include: [eezLayer] });
        if (result.results && result.results.length > 0) {
          const graphic = (result.results[0] as GraphicHit).graphic;
          const newCountrySelection = graphic.attributes['CountryName'];
          if (newCountrySelection) {
            dispatch(setCountry({ name: newCountrySelection, selectedFromMap: true }));
          }
        } else {
          dispatch(setCountry({ name: null, selectedFromMap: false }));
        }
      });

      return () => {
        listener.remove();
      };
    }
  }, [view, eezLayer]);

  // initialize view
  useEffect(() => {
    let mapView: MapView | null = null;
    try {
      mapView = new MapView({
        container: mapDivRef.current,
        map: new WebMap({
          portalItem: {
            id: mapConfig['web-map-id']
          }
        }),
        padding: {
          top: 50,
          bottom: 0
        },
        ui: {
          components: []
        },
        constraints: {
          minZoom: 1
        },
        popup: {
          dockEnabled: true,
          dockOptions: {
            buttonEnabled: false,
            breakpoint: false
          },
          highlightEnabled: false,
          defaultPopupTemplateEnabled: false,
          autoOpenEnabled: false
        }
      });

      mapView.when(() => {
        setView(mapView);
        const eezLayer = mapView.map.layers
          .filter((layer) => layer.title === 'Exclusive Economic Zone boundaries')
          .getItemAt(0) as FeatureLayer;
        eezLayer.outFields = regionNames.map((region) => region.field);
        eezLayer.renderer = getSimpleRenderer();
        setEezLayer(eezLayer);
        //window.view = mapView;
      });
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <>
      <div className={styles.mapContainer} ref={mapDivRef}></div>
      {Children.map(children, (child: ReactNode) => {
        return cloneElement(child as ReactElement, {
          view
        });
      })}
    </>
  );
};

export default Map;
