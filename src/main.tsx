import { createRoot } from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';

import { setAssetPath } from '@esri/calcite-components/dist/components';
setAssetPath('https://unpkg.com/@esri/calcite-components/dist/calcite/assets');
import './main.css';

import App from './components/App';
import { store } from './store/storeConfiguration';
import { fetchCountryData } from './services/dataLoading';
import { setupIdentityManager } from './services/authentication';

const root = createRoot(document.getElementById('root') as HTMLElement);

store.dispatch(fetchCountryData());
store.dispatch(setupIdentityManager());

root.render(
  <ReduxProvider store={store}>
    <App></App>
  </ReduxProvider>
);
