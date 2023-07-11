import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import MapView from 'esri/views/MapView';

let view: MapView = null;
let countriesLayer: FeatureLayer = null;

export function setGlobalView(mapView: MapView) {
  view = mapView;
}

export function getCountriesLayer() {
  if (view && !countriesLayer) {
    countriesLayer = view.map.layers
      .filter((layer) => layer.title === 'Exclusive Economic Zone boundaries')
      .getItemAt(0) as FeatureLayer;
  }
  return countriesLayer;
}

export function getLayerById(id: string) {
  return view.map.findLayerById(id);
}

export function getGlobalView() {
  return view;
}
