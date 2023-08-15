import * as reactiveUtils from "@arcgis/core/core/reactiveUtils";
import { getCountriesLayer, getGlobalView } from "../../globals";
import { setMapCenterToHashParams } from "../../../utils/URLHashParams";
import Graphic from "@arcgis/core/Graphic";
import { layerConfig } from "../../../config";
import { AppDispatch } from "../../storeConfiguration";
import { highlightCountryFromMap } from "../country-selection/countrySelectionThunk";
import { type Polygon } from "@arcgis/core/geometry";

interface GraphicHit {
    graphic: Graphic;
}

const listeners: IHandle[] = [];
export const initializeViewEventListeners = () => (dispatch: AppDispatch) => {

    const view = getGlobalView();
    if (view) {
        console.log("Events are getting added on view with id", view.id);
        const listener = reactiveUtils.when(
            () => view.stationary,
            () => {
                const lon = +view.center.longitude.toFixed(3);
                const lat = +view.center.latitude.toFixed(3);
                const zoom = view.zoom;
                setMapCenterToHashParams({ lon, lat }, zoom);
                console.log("You panned on the map with view id ", view.id);
            }
        );

        listeners.push(listener);
        const countriesLayer = getCountriesLayer();
        const listenerClick = view.on('click', async (event) => {
            console.log("You clicked on a country in the view with id ", view.id);
            const result = await view.hitTest(event, { include: [countriesLayer] });
            if (result.results && result.results.length > 0) {
                const graphic = (result.results[0] as GraphicHit).graphic;
                const newCountrySelection = graphic.attributes[layerConfig.field];
                if (newCountrySelection) {
                    dispatch(highlightCountryFromMap({ name: newCountrySelection, geometry: graphic.geometry as Polygon }));
                }
            } else {
                dispatch(highlightCountryFromMap({ name: null }));
            }
        });

        listeners.push(listenerClick);
    }
}

export const removeEventListeners = () => {
    console.log("events are removed");
    listeners.forEach(listener => listener.remove());
}

