import * as styles from './BottomPanel.module.css';
import '@esri/calcite-components/dist/components/calcite-action';
import '@esri/calcite-components/dist/components/calcite-label';
import '@esri/calcite-components/dist/components/calcite-switch';
import { CalciteAction } from '@esri/calcite-components-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/storeConfiguration';
import CountriesMenu from '../CountriesMenu';
import { useAppSelector } from '../../hooks/useAppSelector';
import { motion } from 'framer-motion';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setInfoModalOptions } from '../../store/services/modal-options/modalSlice';
import { getCountryData } from '../../store/services/map/countryLayer';

const BottomPanel = () => {
  const [visible, setVisible] = useState(true);
  const selectedCountry = useSelector((state: RootState) => state.country);
  const eutrophicationDataLoaded = useAppSelector((state) => state.loading.countryDataLoaded);
  const countryData = eutrophicationDataLoaded ? getCountryData() : null;
  const dispatch = useAppDispatch();

  const togglePanel = () => {
    setVisible(!visible);
  };

  const getHeader = () => {
    return (
      <div className={styles.actionsContainer}>
        <div className={styles.leftActionsContainer}>
          {selectedCountry && selectedCountry.name ? (
            <div>
              <span>
                <span className={styles.selectedCountry}>{selectedCountry.name}</span>
              </span>
            </div>
          ) : (
            <div>Select a country in the menu or on the map.</div>
          )}
        </div>
        <div className={styles.rightActionsContainer}>
          <CalciteAction
            icon='information-f'
            scale='s'
            appearance='transparent'
            text=''
            onClick={() => dispatch(setInfoModalOptions({ visible: true }))}
          ></CalciteAction>
          <CalciteAction
            icon={visible ? 'chevronDown' : 'chevronUp'}
            scale='s'
            appearance='transparent'
            onClick={togglePanel}
            text=''
          ></CalciteAction>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      {getHeader()}
      {countryData ? (
        <motion.div layout='size' animate={{ height: visible ? 'auto' : 0 }} style={{ overflow: 'hidden' }}>
          <CountriesMenu data={countryData}></CountriesMenu>
        </motion.div>
      ) : null}
    </div>
  );
};

export default BottomPanel;
