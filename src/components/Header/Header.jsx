import * as styles from './Header.module.css';
import { config } from '../../config';
import { appStore } from '../../stores/appStore';
import { observer } from 'mobx-react';

export const Header = observer(() => {
  return (
    <header className={styles.contentRow} slot='header'>
      <h2 className={styles.appTitle}>{config.title || appStore.title}</h2>
    </header>
  );
});
