<script lang="ts" setup>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.chinatmsproviders";
import type { FishSpotDetailModel } from "~/apis/fishSpot";

const mapEl = ref<HTMLElement>();
const map = shallowRef<L.Map>();
const spotsLayer = shallowRef<L.GeoJSON>();

const props = defineProps<{
  fishSpots: FishSpotDetailModel[];
}>();

const initMap = () => {
  if (!mapEl.value) return;
  map.value = L.map(mapEl.value).setView([35.8617, 104.1954], 4);

  const { satelliteTileLayer, vectorTileLayer } = useMap();
  // 默认矢量
  vectorTileLayer.addTo(map.value);

  // 添加图层控制
  L.control
    .layers(
      {
        卫星地图: satelliteTileLayer,
        矢量地图: vectorTileLayer,
      },
      {},
      { collapsed: false }
    )
    .addTo(map.value);

  spotsLayer.value = L.geoJSON();
};

watch(
  () => props.fishSpots,
  () => {
    loadGeojson();
  }
);

const loadGeojson = () => {
  // 把所有的钓点中心点加载到地图上
  if (!map.value) return;
  if (spotsLayer.value) {
    map.value.removeLayer(spotsLayer.value);
  }
  // 遍历所有钓点，生成geojson
  const geojson = {
    type: "FeatureCollection",
    features: props.fishSpots.map((spot) => {
      return {
        type: "Feature",
        properties: {
          name: spot.description,
          description: spot.description,
        },
        geometry: JSON.parse(spot.center),
      };
    }),
  };
  spotsLayer.value?.addData(geojson as any);
  spotsLayer.value?.addTo(map.value);

  // 设置地图中心点
  // if (props.fishSpots.length > 0) {
  //   let coordinates = JSON.parse(props.fishSpots[0].center).coordinates;
  //   map.value.setView(L.latLng(coordinates), 10);
  // }
};

onMounted(() => {
  if (!mapEl.value) return;
  initMap();
});
onUnmounted(() => {
  if (!mapEl.value) return;
  mapEl.value.innerHTML = "";
  map.value?.remove();
});
</script>

<template>
  <div class="h-full w-full" ref="mapEl"></div>
</template>
