/**********************
 * URL hash param keys
 *
 * center: longitude, latitude
 * zoom: number
 * country: string
 **********************/
const keys = {
  center: 'mapCenter',
  country: 'country'
};

const hashParams = new URLSearchParams(window.location.hash.slice(1));

const updateHashParams = (key, value) => {
  if (value === undefined || value === null) {
    hashParams.delete(key);
    if (key === keys.country) {
      hashParams.delete(keys.region);
    }
  } else {
    hashParams.set(key, value);
  }
  window.location.hash = hashParams.toString();
};

const getHashParamValueByKey = (key) => {
  if (!hashParams.has(key)) {
    return null;
  }

  return hashParams.get(key);
};

export const setMapCenterToHashParams = (center, zoom) => {
  const { lon, lat } = center;
  const value = `${lon},${lat},${zoom}`;

  updateHashParams(keys.center, value);
};

export const getMapCenterFromHashParams = () => {
  const value = getHashParamValueByKey(keys.center);

  if (!value) {
    return null;
  }

  const [lon, lat, zoom] = value.split(',').map((d) => parseFloat(d));

  return {
    center: {
      lon,
      lat
    },
    zoom
  };
};

export const setCountryToHashParameters = (value) => {
  updateHashParams(keys.country, value);
};

export const getCountryFromHashParameters = () => {
  const value = getHashParamValueByKey(keys.country);
  if (!value) {
    return null;
  }
  return {
    name: value,
    selectedFromMap: true
  };
};
