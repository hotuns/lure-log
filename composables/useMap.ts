import L from "leaflet";
import "leaflet.chinatmsproviders";
const MapKey = "dbed7e0f96194affd82763e159de4c50"; //你的地图key

export function useMap() {
  //卫星地图
  const satelliteTileLayer = L.layerGroup([
    // @ts-ignore
    L.tileLayer.chinaProvider("TianDiTu.Satellite.Map", {
      key: MapKey, //你的地图key
    }),
    // @ts-ignore
    L.tileLayer.chinaProvider("TianDiTu.Satellite.Annotion", {
      key: MapKey, //你的地图key
    }),
  ]);
  // 矢量地图
  const vectorTileLayer = L.layerGroup([
    // @ts-ignore
    L.tileLayer.chinaProvider("TianDiTu.Normal.Map", {
      key: MapKey, //你的地图key
    }),
    // @ts-ignore
    L.tileLayer.chinaProvider("TianDiTu.Normal.Annotion", {
      key: MapKey, //你的地图key
    }),
  ]);

  return {
    satelliteTileLayer,
    vectorTileLayer,
  };
}
