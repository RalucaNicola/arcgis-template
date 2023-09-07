import * as styles from './Map.module.css';
import { FC, ReactNode, useEffect, useRef } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { initializeView, destroyView } from '../../store/services/map/view';
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
      dispatch(initializeView(mapDivRef.current));
      return () => {
        removeEventListeners();
        destroyView();
      };
    }
  }, [mapDivRef.current]);

  return (
    <>
      <div className={styles.mapContainer} ref={mapDivRef}></div>
    </>
  );
};

export default Map;
