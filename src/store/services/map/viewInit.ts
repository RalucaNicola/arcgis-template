import PortalItem from '@arcgis/core/portal/PortalItem';
import WebMap from '@arcgis/core/WebMap';
import { mapConfig } from '../../../config';
import MapView from '@arcgis/core/views/MapView';
import { setGlobalView } from '../../globals';
import { AppDispatch } from '../../storeConfiguration';
import { setViewLoaded } from '../app-loading/loadingSlice';
import { getMapCenterFromHashParams } from '../../../utils/URLHashParams';
import { setError } from '../error-messaging/errorSlice';
import { initializeCountryLayer } from './countryLayerInit';
import { initializeViewEventListeners } from './eventListeners';


export const initializeMapView = (divRef: HTMLDivElement) => async (dispatch: AppDispatch) => {
    try {
        const portalItem = new PortalItem({
            id: mapConfig['web-map-id']
        });

        await portalItem.load();
        const webmap = new WebMap({
            portalItem: portalItem
        });
        await webmap.load();
        const mapView = new MapView({
            container: divRef,
            map: webmap,
            padding: {
                top: 50,
                bottom: 0
            },
            ui: {
                components: []
            },
            constraints: {
                minZoom: 1
            },
            popup: {
                dockEnabled: true,
                dockOptions: {
                    buttonEnabled: false,
                    breakpoint: false
                },
                highlightEnabled: false,
                defaultPopupTemplateEnabled: false,
                autoOpenEnabled: false
            }
        });

        await mapView.when(() => {
            setGlobalView(mapView);
            dispatch(setViewLoaded(true));
            const mapCenter = getMapCenterFromHashParams();
            if (mapCenter) {
                mapView.goTo({ zoom: mapCenter.zoom, center: [mapCenter.center.lon, mapCenter.center.lat] });
            }
            dispatch(initializeCountryLayer());
            //window.view = mapView;
            dispatch(initializeViewEventListeners());
        });
    } catch (error) {
        const { message } = error;
        dispatch(setError({ name: 'Error on map', message: message }));
    }
};