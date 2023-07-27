import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import { setAssetPath } from '@esri/calcite-components/dist/components';
setAssetPath('https://unpkg.com/@esri/calcite-components/dist/calcite/assets');
import './main.css';

import App from './components/App';
import { store } from './store/storeConfiguration';
import { fetchCountryData } from './store/services/app-loading/dataLoadingThunk';
import { setupIdentityManager } from './store/services/authentication/authenticationThunk';

const root = createRoot(document.getElementById('root') as HTMLElement);

store.dispatch(fetchCountryData());
store.dispatch(setupIdentityManager());

root.render(
  <StrictMode>
    <ReduxProvider store={store}>
      <App></App>
    </ReduxProvider>
  </StrictMode>
);
