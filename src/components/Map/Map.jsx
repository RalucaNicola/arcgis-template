import * as styles from './Map.module.css';
import { useEffect, useRef } from 'react';
import { loadMap } from '../../services/map-service';
import { appStore } from '../../stores/appStore';

const initializeView = (viewProperties) => {
  return new Promise(async (resolve, reject) => {
    if (viewProperties.map.declaredClass === 'esri.WebMap') {
      const { default: MapView } = await import('@arcgis/core/views/MapView');
      const mapView = new MapView(viewProperties);
      mapView.when(resolve, reject);
    }
    if (viewProperties.map.declaredClass === 'esri.WebScene') {
      const { default: SceneView } = await import('@arcgis/core/views/SceneView');
      const sceneView = new SceneView(viewProperties);
      sceneView.when(resolve, reject);
    }
  });
};

export function Map() {
  const mapDiv = useRef(null);

  useEffect(() => {
    if (mapDiv.current) {
      let view = null;
      const viewProperties = {
        container: mapDiv.current,
        popup: {
          dockEnabled: true,
          dockOptions: {
            buttonEnabled: false,
            breakpoint: false,
            position: 'top-right'
          }
        }
      };
      (async () => {
        try {
          const map = await loadMap();
          viewProperties.map = map;
          try {
            view = await initializeView(viewProperties);
            appStore.setView(view);
          } catch (error) {
            appStore.setView(undefined);
            appStore.setError(error);
          }
        } catch (error) {
          appStore.setView(undefined);
          appStore.setError(error);
        }
      })();

      return () => {
        if (view) {
          view.destroy();
          view = null;
        }
      };
    }
  }, []);

  return <div className={styles.mapDiv} ref={mapDiv}></div>;
}
