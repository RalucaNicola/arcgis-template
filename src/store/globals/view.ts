import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import MapView from '@arcgis/core/views/MapView';
import { layerConfig } from '../../config';

let view: MapView = null;
let countriesLayer: FeatureLayer = null;

export function setGlobalView(mapView: MapView) {
  view = mapView;
}

export function getGlobalView() {
  return view;
}

export function getCountriesLayer() {
  if (view && !countriesLayer) {
    countriesLayer = view.map.layers.filter((layer) => layer.title === layerConfig.title).getItemAt(0) as FeatureLayer;
  }
  return countriesLayer;
}

export function getLayerById(id: string) {
  return view.map.findLayerById(id);
}
