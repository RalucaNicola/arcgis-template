import * as styles from './BottomPanel.module.css';
import '@esri/calcite-components/dist/components/calcite-action';
import '@esri/calcite-components/dist/components/calcite-label';
import '@esri/calcite-components/dist/components/calcite-switch';
import { CalciteAction } from '@esri/calcite-components-react';
import { useState, PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/storeConfiguration';
import CountriesMenu from '../CountriesMenu';
import { useAppSelector } from '../../hooks/useAppSelector';
import { getEutrophicationData } from '../../store/globals/eutrophicationData';

const BottomPanel = () => {
  const [visible, setVisible] = useState(true);
  const selectedCountry = useSelector((state: RootState) => state.country);
  const eutrophicationDataLoaded = useAppSelector((state) => state.appLoading.eutrophicationDataLoaded);
  const loadingError = useAppSelector((state) => state.appLoading.error);
  const eutrophicationData = eutrophicationDataLoaded ? getEutrophicationData() : null;
  const countryData = eutrophicationData ? eutrophicationData.countryData : null;

  const togglePanel = () => {
    setVisible(!visible);
  };

  const getHeader = () => {
    if (loadingError) {
      return null;
    } else {
      return (
        <div className={styles.actionsContainer}>
          <div className={styles.leftActionsContainer}>
            {selectedCountry && selectedCountry.name ? (
              <div>
                <span>
                  This chart shows the <b>percentage</b> of{' '}
                  <span className={styles.selectedCountry}>{selectedCountry.name}'s EEZ area </span>
                  impacted by eutrophication, through time.{' '}
                </span>
              </div>
            ) : (
              <div>Select a zone to explore eutrophication rates.</div>
            )}
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
    }
  };

  return (
    <div className={styles.container}>
      {getHeader()}
      {countryData ? (
        <div style={{ display: visible ? 'revert' : 'none' }}>
          <CountriesMenu data={countryData}></CountriesMenu>
        </div>
      ) : null}
    </div>
  );
};

export default BottomPanel;
