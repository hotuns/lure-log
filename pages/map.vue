<script setup lang="ts">
import "@amap/amap-jsapi-types";
import { initRadarCanvas, type Radar } from "~/util/darwRadarCanvas";

definePageMeta({
  name: "map",
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
</script>

<template>
  <div class="map-page-container">
    <div class="w-full h-full relative">
      <ClientOnly>
        <MapLeaflet />
      </ClientOnly>

      <van-button
        class="map-tool abs-center-x bottom-40"
        loading
        type="success"
        loading-text="加载中..."
      >
        搜索这里</van-button
      >

      <MapFloatingPanel />
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

:deep(.amap-logo) {
  display: none !important;
}
:deep(.amap-copyright) {
  display: none !important;
}
</style>
