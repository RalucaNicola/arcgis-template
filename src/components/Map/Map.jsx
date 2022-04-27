import * as styles from './Map.module.css';
import { useEffect, useRef } from 'react';
import { loadMap } from '../../services/map-service';

const initializeView = async (viewProperties) => {
  const map = await loadMap();
  viewProperties.map = map;
  return new Promise(async (resolve, reject) => {
    if (map.declaredClass === 'esri.WebMap') {
      const { default: MapView } = await import('@arcgis/core/views/MapView');
      const mapView = new MapView(viewProperties);
      mapView.when(resolve, reject);
    }

    if (map.declaredClass === 'esri.WebScene') {
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
        container: mapDiv.current
      };
      initializeView(viewProperties).then((result) => {
        view = result;
      });

      return () => {
        view.destroy();
      };
    }
  }, []);

  return <div className={styles.mapDiv} ref={mapDiv}></div>;
}
