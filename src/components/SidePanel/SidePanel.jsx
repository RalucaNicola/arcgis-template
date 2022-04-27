import * as styles from './SidePanel.module.css';
import '@esri/calcite-components/dist/components/calcite-shell-panel';
import '@esri/calcite-components/dist/components/calcite-action-bar';
import '@esri/calcite-components/dist/components/calcite-panel';
import { CalciteShellPanel, CalciteActionBar, CalciteAction, CalcitePanel } from '@esri/calcite-components-react';
import { useState } from 'react';

export function SidePanel() {
  const [activePanel, setActivePanel] = useState(null);
  const togglePanel = (value) => {
    const active = activePanel === value ? null : value;
    setActivePanel(active);
  };
  return (
    <CalciteShellPanel slot='primary-panel' position='start' width-scale='m' collapsed={activePanel === null}>
      <CalciteActionBar slot='action-bar'>
        <CalciteAction
          text='Layers'
          icon='layers'
          onClick={() => {
            togglePanel('layer-list');
          }}
        ></CalciteAction>
      </CalciteActionBar>
      <CalcitePanel hidden={activePanel !== 'layer-list'}>
        <div slot='header-content'>Layers</div>
        <div slot='header-actions-end'>
          <CalciteAction
            icon='x'
            title='close panel'
            className='toggle-close'
            onClick={() => {
              setActivePanel(null);
            }}
          ></CalciteAction>
        </div>
        <div id='layer-list-container'></div>
      </CalcitePanel>
    </CalciteShellPanel>
  );
}
