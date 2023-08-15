import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import MapView from '@arcgis/core/views/MapView';
import { DSVRowArray } from 'd3';
import { layerConfig } from '../../config';

let view: MapView = null;
let countriesLayer: FeatureLayer = null;
let countryData: DSVRowArray<string> | null = null;

export function setGlobalView(mapView: MapView) {
  view = mapView;
  console.log(`Setting global variable view with id ${view.id} on container with id ${view.container.id}`);
}

export function getGlobalView() {
  return view;
}
window.getGlobalView = getGlobalView;

export function getCountriesLayer() {
  if (view && !countriesLayer) {
    countriesLayer = view.map.layers.filter((layer) => layer.title === layerConfig.title).getItemAt(0) as FeatureLayer;
  }
  return countriesLayer;
}

window.getCountriesLayer = getCountriesLayer;

export function getLayerById(id: string) {
  return view.map.findLayerById(id);
}

export function setCountryData(data: DSVRowArray<string>) {
  countryData = data;
}

export function getCountryData() {
  return countryData;
}
