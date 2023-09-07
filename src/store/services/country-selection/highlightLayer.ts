import Graphic from '@arcgis/core/Graphic';
import { Extent, Polygon } from '@arcgis/core/geometry';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import GroupLayer from '@arcgis/core/layers/GroupLayer';
import { SimpleFillSymbol } from '@arcgis/core/symbols';
import { getView } from '../map/view';

let bottomLayer: GraphicsLayer = null;
let shadowLayer: GraphicsLayer = null;
let topLayer: GraphicsLayer = null;

const maskSymbol = new SimpleFillSymbol({
  color: [0, 0, 0, 1],
  outline: {
    color: [40, 40, 40],
    width: '2pt'
  }
});

const shadowSymbol = new SimpleFillSymbol({
  color: [0, 0, 0, 1],
  outline: null
});

const worldLowlightSymbol = new SimpleFillSymbol({
  color: 'rgba(0, 0, 0, 0.5)',
  outline: null
});

export const createHighlightLayer = () => {
  const view = getView();
  const world = new Graphic({
    geometry: new Extent({
      xmin: -180,
      xmax: 180,
      ymin: -90,
      ymax: 90
    }),
    symbol: worldLowlightSymbol
  });

  bottomLayer = new GraphicsLayer({ opacity: 0 });
  bottomLayer.graphics.add(world);

  shadowLayer = new GraphicsLayer({
    effect:
      'drop-shadow(0, 0, 30px, rgb(40, 40, 40)) drop-shadow(0, 0, 10px, rgb(40, 40, 40)) drop-shadow(0, 0, 5px, rgb(40, 40, 40))'
  });

  topLayer = new GraphicsLayer({
    blendMode: 'destination-out'
  });

  const groupLayer = new GroupLayer({
    title: 'Highlight layer',
    layers: [bottomLayer, shadowLayer, topLayer]
  });
  view.map.add(groupLayer);
};

export function applyFeatureHighlight(geometry: Polygon) {
  topLayer.removeAll();
  shadowLayer.removeAll();
  const graphic = new Graphic({
    geometry,
    symbol: maskSymbol
  });
  topLayer.add(graphic);
  const shadowGraphic = graphic.clone();
  shadowGraphic.symbol = shadowSymbol;
  shadowLayer.add(shadowGraphic);
  bottomLayer.opacity = 1;
}

export const removeFeatureHighlight = () => {
  topLayer.removeAll();
  shadowLayer.removeAll();
  bottomLayer.opacity = 0;
};
