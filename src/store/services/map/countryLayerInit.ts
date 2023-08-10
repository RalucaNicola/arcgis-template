import MapView from "@arcgis/core/views/MapView";
import { getCountriesLayer } from "../../globals";
import { AppDispatch } from "../../storeConfiguration";
import { layerConfig } from "../../../config";
import { createHighlightLayer } from "../country-selection/highlightLayer";
import { getCountryFromHashParameters } from "../../../utils/URLHashParams";
import { highlightCountryAtStart } from "../country-selection/countrySelectionThunk";

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