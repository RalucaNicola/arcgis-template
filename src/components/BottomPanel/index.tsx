import * as styles from './BottomPanel.module.css';
import '@esri/calcite-components/dist/components/calcite-action';
import '@esri/calcite-components/dist/components/calcite-label';
import '@esri/calcite-components/dist/components/calcite-switch';
import { CalciteAction } from '@esri/calcite-components-react';
import { useState, PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/storeConfiguration';

const BottomPanel = ({ children }: PropsWithChildren) => {
  const [visible, setVisible] = useState(true);
  const selectedCountry = useSelector((state: RootState) => state.country);
  console.log('BottomPanel rendered');

  const togglePanel = () => {
    setVisible(!visible);
  };

  return (
    <div className={styles.container}>
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
      <div style={{ display: visible ? 'revert' : 'none' }}>{children}</div>
    </div>
  );
};

export default BottomPanel;
