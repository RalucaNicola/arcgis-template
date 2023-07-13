import { SimpleRenderer } from '@arcgis/core/renderers';
import UniqueValueRenderer from '@arcgis/core/renderers/UniqueValueRenderer';

const defaultSymbol = {
  type: 'simple-fill',
  color: [0, 217, 109, 0],
  style: 'solid',
  outline: {
    width: 0.5,
    color: [255, 255, 255, 1]
  }
};

const highlightedSymbol = {
  type: 'simple-fill',
  color: [255, 255, 255],
  style: 'diagonal-cross',
  outline: {
    width: 1,
    color: [255, 255, 255]
  }
};

export const getSelectionRenderer = (field: string, value: string) => {
  return new UniqueValueRenderer({
    field,
    defaultSymbol,
    uniqueValueInfos: [
      {
        value,
        symbol: highlightedSymbol
      }
    ]
  });
};

export const getSimpleRenderer = () => {
  return new SimpleRenderer({
    symbol: defaultSymbol
  });
};

export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];
