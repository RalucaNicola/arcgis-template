import { config } from '../config';

export const loadMap = async () => {
  let map = null;
  const id = config.webmap || config.webscene;
  if (config.webmap) {
    const { default: WebMap } = await import('@arcgis/core/WebMap');
    map = new WebMap({ portalItem: { id: config.webmap } });
  }
  if (config.webscene) {
    const { default: WebScene } = await import('@arcgis/core/WebScene');
    map = new WebScene({ portalItem: { id: config.webscene } });
  }
  return new Promise((resolve, reject) => {
    if (id) {
      map
        .loadAll()
        .then(() => {
          resolve(map);
        })
        .catch((error) => {
          reject(error || new Error('Error loading map'));
        });
    } else {
      reject(new Error('No configured WebMap or WebScene id.'));
    }
  });
};
