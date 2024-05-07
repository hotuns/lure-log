<script setup lang="ts">
import "@vuemap/vue-amap/dist/style.css";
import { initMapApi } from "~/util/mapLoadUtil";
import {
  ElAmap,
  ElAmapLayerCanvas,
  useCitySearch,
  lazyAMapApiLoaderInstance,
} from "@vuemap/vue-amap";
import { initRadarCanvas, type Radar } from "~/util/darwRadarCanvas";

definePageMeta({
  name: "map",
  layout: "home",
});

onBeforeMount(() => {
  initMapApi();

  //   获取城市
  lazyAMapApiLoaderInstance.then(() => {
    useCitySearch().then((res) => {
      const { getLocalCity } = res;
      getLocalCity().then((cityResult) => {
        radarBounds.value = cityResult.bounds;
        radar?.scan();

        center.value = cityResult.bounds.getCenter().toArray();
        console.log("cityResult: ", cityResult);
      });
    });
  });
});

const mapRef = ref();
const zoom = ref(16);
const center = ref([116.33719, 39.942384]);
let map: any = null;

const click = () => {
  console.log("setup $refs: ", mapRef.value.$$getInstance());
};

const init = (o: any) => {
  map = o;
  console.log("setup init $refs: ", mapRef.value.$$getInstance());

  map.plugin("AMap.Geolocation", () => {
    const toolBar = new AMap.Geolocation();
    map.addControl(toolBar);
  });

  createCanvs();
};

const radarVisible = ref(true);
const radarCanvas = ref<HTMLCanvasElement>();
let radar: Radar | null = null;
const radarBounds = ref([116.327911, 39.939229, 116.342659, 39.946275]);

const switchVisible = () => {
  radarVisible.value = !radarVisible.value;
};

function createCanvs() {
  radarCanvas.value = document.createElement("canvas");
  radarCanvas.value.width = radarCanvas.value.height = 500;
}
const initLayer = (layer: any) => {
  if (!radarCanvas.value) return;
  radar = initRadarCanvas(radarCanvas.value);
};
</script>

<template>
  <div class="map-page-container">
    <div class="w-full h-full">
      <ClientOnly>
        <el-amap
          ref="mapRef"
          :center="center"
          :zoom="zoom"
          @init="init"
          @click="click"
        >
          <el-amap-layer-canvas
            v-if="radarCanvas"
            :canvas="radarCanvas"
            :bounds="radarBounds"
            :radarVisible="radarVisible"
            @init="initLayer"
          />
        </el-amap>
      </ClientOnly>
    </div>
  </div>
</template>

<style scoped>
.map-page-container {
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: calc(100vh - 80px);
}

:deep(.amap-logo) {
  display: none !important;
}
:deep(.amap-copyright) {
  display: none !important;
}
</style>
