import MapView from "@arcgis/core/views/MapView";
import { getCountriesLayer } from "../../globals";
import { AppDispatch } from "../../storeConfiguration";
import { layerConfig } from "../../../config";
import { createHighlightLayer } from "../country-selection/highlightLayer";
import { getCountryFromHashParameters } from "../../../utils/URLHashParams";
import { highlightCountryAtStart } from "../country-selection/countrySelectionThunk";

export const initializeCountryLayer = (view) => (dispatch: AppDispatch) => {
    console.log("Initializing countries layer on view with id", view.id);
    const countriesLayer = getCountriesLayer();
    countriesLayer.outFields = [layerConfig.field];
    // create layer used to highlight the selected country
    createHighlightLayer();
    const countryName = getCountryFromHashParameters();
    if (countryName) {
        dispatch(highlightCountryAtStart({ name: countryName }));
    }
}