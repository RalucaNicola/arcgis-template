import * as styles from './Error.module.css';
import { appStore } from '../../stores/appStore';
import { observer } from 'mobx-react';

import '@esri/calcite-components/dist/components/calcite-notice';
import { CalciteNotice } from '@esri/calcite-components-react';

export const Error = observer(() => {
  return (
    <CalciteNotice icon='' scale='m' width='auto' dismissible='' color='red' active={appStore.error ? true : null}>
      <div slot='title'>{appStore.error ? appStore.error.name : 'Error'}</div>
      <div slot='message'>{appStore.error ? appStore.error.message : ''}</div>
    </CalciteNotice>
  );
});
