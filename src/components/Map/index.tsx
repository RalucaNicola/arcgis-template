import * as styles from './Map.module.css';
import { FC, ReactNode, useEffect, useRef } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { initializeMapView } from '../../store/services/map/viewInit';
import { removeEventListeners } from '../../store/services/map/eventListeners';

interface Props {
  children?: ReactNode;
}

const Map: FC<Props> = () => {
  const mapDivRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();


  // initialize view
  useEffect(() => {
    if (mapDivRef.current) {
      dispatch(initializeMapView(mapDivRef.current));
      return () => {
        removeEventListeners();
      }
    }
  }, [mapDivRef.current]);

  return (
    <>
      <div className={styles.mapContainer} ref={mapDivRef}></div>
    </>
  );
};

export default Map;
