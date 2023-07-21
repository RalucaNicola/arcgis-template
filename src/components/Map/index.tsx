import * as styles from './Map.module.css';
import { Children, FC, ReactElement, ReactNode, cloneElement, useEffect, useRef, useState } from 'react';
import MapView from '@arcgis/core/views/MapView';
import { mapConfig } from '../../config';
import { setGlobalView } from '../../store/globals/view';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setViewLoaded } from '../../store/services/app-loading/loadingSlice';
import PortalItem from '@arcgis/core/portal/PortalItem';
import WebMap from '@arcgis/core/WebMap';
import { setError } from '../../store/services/error-messaging/errorSlice';
import * as reactiveUtils from '@arcgis/core/core/reactiveUtils';
import { getMapCenterFromHashParams, setMapCenterToHashParams } from '../../utils/URLHashParams';

interface MapProps {
  children?: ReactNode;
}

const Map: FC<MapProps> = ({ children }: MapProps) => {
  const [view, setView] = useState<MapView | null>(null);
  const mapDivRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const initializeMapView = async () => {
    try {
      const portalItem = new PortalItem({
        id: mapConfig['web-map-id']
      });

      await portalItem.load();
      const webmap = new WebMap({
        portalItem: portalItem
      });
      await webmap.load();
      const mapView = new MapView({
        container: mapDivRef.current,
        map: webmap,
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

      await mapView.when(() => {
        setView(mapView);
        setGlobalView(mapView);
        dispatch(setViewLoaded(true));
        const mapCenter = getMapCenterFromHashParams();
        if (mapCenter) {
          mapView.goTo({ zoom: mapCenter.zoom, center: [mapCenter.center.lon, mapCenter.center.lat] });
        }
        //window.view = mapView;
      });
    } catch (error) {
      const { message } = error;
      dispatch(setError({ name: 'Error on map', message: message }));
    }
  };

  // add event listeners
  useEffect(() => {
    if (view) {
      const listener = reactiveUtils.when(
        () => view.stationary,
        () => {
          const lon = +view.center.longitude.toFixed(3);
          const lat = +view.center.latitude.toFixed(3);
          const zoom = view.zoom;
          setMapCenterToHashParams({ lon, lat }, zoom);
        }
      );
      return () => {
        listener.remove();
      };
    }
  }, [view]);

  // initialize view
  useEffect(() => {
    initializeMapView();
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
