import * as styles from './Identity.module.css';
import { CalciteAvatar, CalciteButton } from '@esri/calcite-components-react';
import '@esri/calcite-components/dist/components/calcite-avatar';
import '@esri/calcite-components/dist/components/calcite-button';
import { motion } from 'framer-motion';

const MotionAvatar = motion(CalciteAvatar);

import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { signIn, signOut } from '../../services/authentication';
import { useState } from 'react';

export const Identity = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { signedIn, userName, fullName, thumbnailUrl } = useAppSelector((state) => state.authentication);

  const toggleIdentityMenu = () => {
    setOpen(!open);
  };

  return (
    <div className={styles.identity}>
      {!signedIn ? (
        <CalciteButton appearance='solid' kind='neutral' onClick={() => dispatch(signIn())}>
          Sign in
        </CalciteButton>
      ) : (
        <MotionAvatar
          whileHover={{ scale: 1.2, z: 0, transition: { type: 'spring', duration: 0.8 } }}
          className={styles.avatar}
          fullName={fullName}
          username={userName}
          thumbnail={thumbnailUrl}
          scale='m'
          onClick={toggleIdentityMenu}
        ></MotionAvatar>
      )}
      {open && signedIn && (
        <motion.div className={styles.identityMenu}>
          <div className={styles.userInfo}>
            <CalciteAvatar fullName={fullName} username={userName} thumbnail={thumbnailUrl} scale='l'></CalciteAvatar>
            <div>
              <p className={styles.userTitle}>{fullName}</p>
              <p>{userName}</p>
            </div>
          </div>
          <CalciteButton kind='neutral' width='full' onClick={() => dispatch(signOut())}>
            Sign out
          </CalciteButton>
        </motion.div>
      )}
    </div>
  );
};
