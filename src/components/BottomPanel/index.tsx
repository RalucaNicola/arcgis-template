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
import { getCountryData } from '../../store/globals/countryData';
import { motion } from 'framer-motion';

const BottomPanel = () => {
  const [visible, setVisible] = useState(true);
  const selectedCountry = useSelector((state: RootState) => state.country);
  const eutrophicationDataLoaded = useAppSelector((state) => state.loading.countryDataLoaded);
  const countryData = eutrophicationDataLoaded ? getCountryData() : null;

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
        <CalciteAction
          icon={visible ? 'chevronDown' : 'chevronUp'}
          scale='s'
          appearance='transparent'
          onClick={togglePanel}
          text=''
        ></CalciteAction>
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
