import * as styles from './SidePanel.module.css';
import '@esri/calcite-components/dist/components/calcite-shell-panel';
import '@esri/calcite-components/dist/components/calcite-action-bar';
import '@esri/calcite-components/dist/components/calcite-panel';
import '@esri/calcite-components/dist/components/calcite-pick-list';
import { CalciteShellPanel, CalciteActionBar, CalciteAction, CalcitePanel } from '@esri/calcite-components-react';
import { useEffect, useRef, useState } from 'react';
import { appStore } from '../../stores/appStore';
import LayerList from '@arcgis/core/widgets/LayerList';
import { FeatureListPanel } from '../FeatureListPanel';
import { config } from '../../config';

const initializeLayerList = (container, view) => {
  if (container && view) {
    new LayerList({
      container,
      view,
      listItemCreatedFunction: (event) => {
        event.item.open = event.item.layer.type === 'group';
      },
      visibleElements: { statusIndicators: true }
    });
  }
};
export const SidePanel = () => {
  const layerListContainer = useRef(null);
  const [activePanel, setActivePanel] = useState(null);

  const togglePanel = (value) => {
    const active = activePanel === value ? null : value;
    setActivePanel(active);
  };

  useEffect(() => {
    initializeLayerList(layerListContainer.current, appStore.view);
  }, [layerListContainer.current, appStore.view]);

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
        <CalciteAction
          text='Features'
          icon='list'
          onClick={() => {
            togglePanel('features-list');
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
        <div id='layer-list-container' ref={layerListContainer}></div>
      </CalcitePanel>
      {config.layerInfo ? (
        <FeatureListPanel hidden={activePanel !== 'features-list'} setActivePanel={setActivePanel}></FeatureListPanel>
      ) : (
        <></>
      )}
    </CalciteShellPanel>
  );
};
