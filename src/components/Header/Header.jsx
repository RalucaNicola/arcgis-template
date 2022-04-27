import * as styles from './Header.module.css';
import { config } from '../../config';

export function Header() {
  return (
    <header className={styles.contentRow} slot='header'>
      <h2 className={styles.appTitle}>{config.title}</h2>
    </header>
  );
}
