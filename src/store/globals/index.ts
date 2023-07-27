import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import MapView from '@arcgis/core/views/MapView';
import { DSVRowArray } from 'd3';
import { layerConfig } from '../../config';

let view: MapView = null;
let countriesLayer: FeatureLayer = null;
let countryData: DSVRowArray<string> | null = null;

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

export function setCountryData(data: DSVRowArray<string>) {
  countryData = data;
}

export function getCountryData() {
  return countryData;
}
