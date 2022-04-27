import * as styles from './App.module.css';
import { Map } from '../components/Map';
import { Header } from '../components/Header';
import { SidePanel } from '../components/SidePanel';
import '@esri/calcite-components/dist/components/calcite-shell';
import { CalciteShell } from '@esri/calcite-components-react';
import '@esri/calcite-components/dist/components/calcite-loader';
import { CalciteLoader } from '@esri/calcite-components-react';
import { setAssetPath } from '@esri/calcite-components/dist/components';
import { appStore } from '../stores/appStore';
import { observer } from 'mobx-react';
import { Error } from '../components/Error';
setAssetPath('https://js.arcgis.com/calcite-components/1.0.0-beta.80/assets');

export const App = observer(() => {
  return (
    <>
      <CalciteShell dir='ltr'>
        <Header></Header>
        <SidePanel></SidePanel>
        <div className={styles.contentFill}>
          <Map></Map>
        </div>
        <Error></Error>
      </CalciteShell>
      <CalciteLoader active={appStore.loading ? 'true' : null} type='indeterminate' scale='l'></CalciteLoader>
    </>
  );
});
