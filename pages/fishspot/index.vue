<script setup lang="ts">
import "@amap/amap-jsapi-types";
import type { FishSpotModel } from "~/apis/fishSpot";
import { initRadarCanvas, type Radar } from "~/util/darwRadarCanvas";

definePageMeta({
  name: "fishspot",
  layout: "home",
});

var radarLayer = shallowRef<AMap.CustomLayer>();
const createRadar = () => {
  var canvas = document.createElement("canvas");

  radarLayer.value = new AMap.CustomLayer(canvas, {
    zooms: [2, 18],
    zIndex: 120,
    render: () => {
      initRadarCanvas(canvas)?.scan();
    },
  });
};

// 挂载
onMounted(() => {});
// 卸载
onUnmounted(() => {});

const fishSpotStore = useFishspotStore();
fishSpotStore.fetchFishFullSpots();

const toCreate = () => {
  navigateTo({ name: "fishSpot-create" });
};
</script>

<template>
  <div class="map-page-container">
    <div class="w-full h-full relative">
      <van-floating-bubble
        :offset="{ x: 24, y: 500 }"
        axis="xy"
        magnetic="x"
        icon="plus"
        @click="toCreate"
      />

      <ClientOnly>
        <MapLeaflet :fishSpots="fishSpotStore.fishFullSpots" />
      </ClientOnly>

      <MapFloatingPanel :fishSpots="fishSpotStore.fishFullSpots" />
    </div>
  </div>
</template>

<style scoped>
.map-page-container {
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 100%;
}
.map-tool {
  position: absolute;
  z-index: 500;
}
</style>
