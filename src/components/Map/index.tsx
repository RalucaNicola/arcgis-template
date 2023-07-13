import * as styles from './Map.module.css';
import { Children, FC, ReactElement, ReactNode, cloneElement, useEffect, useRef, useState } from 'react';
import MapView from '@arcgis/core/views/MapView';
import { mapConfig } from '../../config';
import { setGlobalView } from '../../store/globals/view';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setLoadingError, setViewLoaded } from '../../store/services/app-loading/loadingSlice';
import PortalItem from '@arcgis/core/portal/PortalItem';
import WebMap from '@arcgis/core/WebMap';

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
        window.view = mapView;
      });
    } catch (error) {
      const { message, details } = error;
      dispatch(setLoadingError({ error: { name: message, message: details.url } }));
    }
  };

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
