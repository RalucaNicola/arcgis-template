import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import { setAssetPath } from '@esri/calcite-components/dist/components';
setAssetPath('https://unpkg.com/@esri/calcite-components/dist/calcite/assets');
import './main.css';

import ErrorPage from './pages/ErrorPage';
import App from './components/App';
import { configureAppStore } from './store/storeConfiguration';

const root = createRoot(document.getElementById('root') as HTMLElement);

try {
  root.render(
    <StrictMode>
      <ReduxProvider store={configureAppStore({})}>
        <App></App>
      </ReduxProvider>
    </StrictMode>
  );
} catch (err) {
  root.render(<ErrorPage />);
}
