import { AppDispatch } from "../../storeConfiguration";
import { layerConfig } from "../../../config";
import { createHighlightLayer } from "../country-selection/highlightLayer";
import { getCountryFromHashParameters } from "../../../utils/URLHashParams";
import { highlightCountryAtStart } from "../country-selection/countrySelectionThunk";
import { getView } from "./view";
import { DSVRowArray } from 'd3';

let countryData: DSVRowArray<string> | null = null;
let countriesLayer: __esri.FeatureLayer = null;

export const initializeCountryLayer = () => async (dispatch: AppDispatch) => {
    const countriesLayer = getCountriesLayer();
    countriesLayer.outFields = [layerConfig.field];
    // create layer used to highlight the selected country
    createHighlightLayer();
    const countryName = getCountryFromHashParameters();
    if (countryName) {
        dispatch(highlightCountryAtStart({ name: countryName }));
    }
}

export function getCountriesLayer() {
    const view = getView();
    if (view) {
        countriesLayer = view.map.layers.filter((layer: __esri.Layer) => layer.title === layerConfig.title).getItemAt(0) as __esri.FeatureLayer;
    }
    return countriesLayer;
}

export function setCountryData(data: DSVRowArray<string>) {
    countryData = data;
}

export function getCountryData() {
    return countryData;
}
