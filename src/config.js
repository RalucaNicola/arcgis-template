import { dateFormatter, acresFormatter } from './utils';

export const config = {
  title: '',
  description: '',
  portalUrl: 'https://www.arcgis.com',
  oauthappid: null,
  apiKey: null,
  group: '',
  webmap: '11095b26dc604a21b61226bf1ab52d82',
  webscene: '',
  shareable: [],
  layerInfo: {
    title: 'Current Perimeters',
    filter: '(IncidentName is not null)',
    queryParams: {
      returnGeometry: true,
      outFields: ['OBJECTID', 'IncidentName', 'FeatureCategory', 'GISAcres', 'DateCurrent'],
      orderByFields: ['DateCurrent DESC']
    },
    objectIdField: 'OBJECTID',
    itemInfos: {
      label: (f) => `${f.attributes.IncidentName}`,
      description: (f) =>
        `${dateFormatter.format(new Date(f.attributes.DateCurrent))} | Acres: ${acresFormatter.format(
          f.attributes.GISAcres
        )}`
    }
  }
};
