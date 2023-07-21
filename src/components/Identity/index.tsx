import * as styles from './Identity.module.css';
import { CalciteAvatar } from '@esri/calcite-components-react';
import '@esri/calcite-components/dist/components/calcite-avatar';

import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { signIn, signOut } from '../../store/services/authentication/authenticationThunk';

export const Identity = () => {
  const dispatch = useAppDispatch();
  const { signedIn, userName, fullName } = useAppSelector((state) => state.authentication);
  return (
    <div className={styles.identity}>
      {!signedIn ? (
        <button onClick={() => dispatch(signIn())}>Sign in</button>
      ) : (
        <CalciteAvatar fullName={fullName} onClick={() => dispatch(signOut())}></CalciteAvatar>
      )}
    </div>
  );
};
