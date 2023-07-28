import { AppDispatch } from '../../storeConfiguration';
import IdentityManager from '@arcgis/core/identity/IdentityManager';
import OAuthInfo from '@arcgis/core/identity/OAuthInfo';
import Portal from '@arcgis/core/portal/Portal';
import { portalUrl } from '../../../config';
import { setAuthenticationInfo } from './authenticationSlice';

export const setupIdentityManager = () => async (dispatch: AppDispatch) => {
  const portal = new Portal({ url: portalUrl });
  const authInfo = new OAuthInfo({
    appId: '55DVg0Bhw8eNhX7V',
    flowType: 'auto',
    popup: false,
    portalUrl
  });
  IdentityManager.registerOAuthInfos([authInfo]);

  try {
    await IdentityManager.checkSignInStatus(authInfo.portalUrl + '/sharing');
    await portal.load();
    dispatch(
      setAuthenticationInfo({
        signedIn: true,
        userName: portal.user?.username,
        fullName: portal.user?.fullName,
        email: portal.user?.email,
        thumbnailUrl: portal.user?.thumbnailUrl
      })
    );
  } catch (error) {
    console.log(error);
  }
};

export const signIn = () => async (dispatch: AppDispatch) => {
  IdentityManager.getCredential(portalUrl + '/sharing');
};

export const signOut = () => async (dispatch: AppDispatch) => {
  IdentityManager.destroyCredentials();
  window.location.reload();
  dispatch(
    setAuthenticationInfo({
      signedIn: false,
      userName: null,
      fullName: null,
      email: null,
      thumbnailUrl: null
    })
  );
};
