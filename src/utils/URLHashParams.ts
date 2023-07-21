/**********************
 * URL hash param keys
 *
 * center: longitude, latitude
 * zoom: number
 * country: string
 **********************/
enum Keys {
  Center = 'mapCenter',
  Country = 'country'
}

interface Center {
  lon: number;
  lat: number;
}

const hashParams = new URLSearchParams(window.location.hash.slice(1));

const updateHashParams = (key: Keys, value: string) => {
  if (value === undefined || value === null) {
    hashParams.delete(key);
  } else {
    hashParams.set(key, value);
  }
  window.location.hash = hashParams.toString();
};

const getHashParamValueByKey = (key: Keys) => {
  if (!hashParams.has(key)) {
    return null;
  }

  return hashParams.get(key);
};

export const setMapCenterToHashParams = (center: Center, zoom: number) => {
  const { lon, lat } = center;
  const value = `${lon},${lat},${zoom}`;

  updateHashParams(Keys.Center, value);
};

export const getMapCenterFromHashParams = () => {
  const value = getHashParamValueByKey(Keys.Center);

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

export const setCountryToHashParameters = (value: string) => {
  updateHashParams(Keys.Country, value);
};

export const getCountryFromHashParameters = () => {
  const value = getHashParamValueByKey(Keys.Country);
  if (!value) {
    return null;
  }
  return value;
};
