import * as styles from './FeatureListPanel.module.css';
import '@esri/calcite-components/dist/components/calcite-action-bar';
import '@esri/calcite-components/dist/components/calcite-panel';
import '@esri/calcite-components/dist/components/calcite-pick-list';
import '@esri/calcite-components/dist/components/calcite-pick-list-item';
import { CalciteAction, CalcitePanel, CalcitePickList, CalcitePickListItem } from '@esri/calcite-components-react';
import { useEffect, useState } from 'react';
import { appStore } from '../../stores/appStore';
import { config } from '../../config';

const ListItem = ({ feature }) => {
  return (
    <CalcitePickListItem
      label={config.layerInfo.itemInfos.label(feature)}
      description={config.layerInfo.itemInfos.description(feature)}
      value={feature.attributes[config.layerInfo.objectIdField]}
      aria-checked='false'
      role='menuitemcheckbox'
      icon='circle'
      disabled='false'
      onClick={() => {
        appStore.view.popup.close();
        const zoomTarget = feature.geometry.type === 'point' ? feature : feature.geometry.extent.clone().expand(1.5);
        appStore.view.goTo(zoomTarget);
      }}
    >
      <CalciteAction
        slot='actions-end'
        label=''
        appearance='clear'
        scale='s'
        icon='information'
        onClick={(event) => {
          event.stopPropagation();
          appStore.view.popup.open({ features: [feature] });
        }}
      ></CalciteAction>
    </CalcitePickListItem>
  );
};
export const FeatureListPanel = ({ hidden, setActivePanel }) => {
  const [featureList, setFeatureList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState(null);

  useEffect(() => {
    if (appStore.view) {
      const featureLayer = appStore.view.map.allLayers.find((layer) => layer.title === config.layerInfo.title);
      if (featureLayer) {
        featureLayer.load().then(() => {
          setTitle(featureLayer.title);
          featureLayer.set({ outFields: ['*'] });
          const featuresQuery = featureLayer.createQuery();
          featuresQuery.set({ where: config.layerInfo.filter || '1=1', ...config.layerInfo.queryParams });
          featureLayer.queryFeatures(featuresQuery).then((featuresFS) => {
            setLoading(false);
            setFeatureList(featuresFS.features);
          });
        });
      } else {
        setLoading(false);
        appStore.setError(new Error(`Can't find layer with title ${config.layerInfo.title}`));
      }
    }
  }, [appStore.view]);

  return (
    <CalcitePanel hidden={hidden}>
      <div slot='header-content'>{title || 'Features'}</div>
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
      <CalcitePickList loading={loading}>
        {featureList.map((feature, index) => (
          <ListItem feature={feature} key={index}></ListItem>
        ))}
      </CalcitePickList>
    </CalcitePanel>
  );
};
