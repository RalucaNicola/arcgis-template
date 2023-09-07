import * as reactiveUtils from "@arcgis/core/core/reactiveUtils";
import { setMapCenterToHashParams } from "../../../utils/URLHashParams";
import Graphic from "@arcgis/core/Graphic";
import { layerConfig } from "../../../config";
import { AppDispatch } from "../../storeConfiguration";
import { highlightCountryFromMap } from "../country-selection/countrySelectionThunk";
import { type Polygon } from "@arcgis/core/geometry";
import { getView } from "./view";
import { getCountriesLayer } from "./countryLayer";

interface GraphicHit {
    graphic: Graphic;
}

const listeners: IHandle[] = [];
export const initializeViewEventListeners = () => (dispatch: AppDispatch) => {
    const view = getView();
    if (view) {
        const listener = reactiveUtils.when(
            () => view.stationary,
            () => {
                const lon = +view.center.longitude.toFixed(3);
                const lat = +view.center.latitude.toFixed(3);
                const zoom = view.zoom;
                setMapCenterToHashParams({ lon, lat }, zoom);
            }
        );

        listeners.push(listener);
        const countriesLayer = getCountriesLayer();
        const listenerClick = view.on('click', async (event) => {
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
    listeners.forEach(listener => listener.remove());
}

