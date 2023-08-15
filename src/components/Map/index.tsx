import * as styles from './Map.module.css';
import { FC, ReactNode, useEffect, useRef, useState } from 'react';
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
      mapDivRef.current.id = crypto.getRandomValues(new Uint32Array(1))[0].toString();
      console.log('Container with id', mapDivRef.current.id, 'is ready');
      dispatch(initializeMapView(mapDivRef.current));
      return () => {
        console.log('Running effect cleanup on container id ', mapDivRef.current.id);
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
