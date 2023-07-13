import {
  getCountryFromHashParameters
} from './URLHashParams';

export const getPreloadedState = () => {
  return {
    isInfoModalOpen: false,
    country: getCountryFromHashParameters()
  };
};
