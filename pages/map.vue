<script setup lang="ts">
import "@amap/amap-jsapi-types";
import { initRadarCanvas, type Radar } from "~/util/darwRadarCanvas";

definePageMeta({
  name: "map",
  layout: "home",
});

// 地图实例
const map = shallowRef<AMap.Map>();
const amapId = computed(() => {
  return `amap_${Date.now()}`;
});
// 初始化
const initMap = async () => {
  await nextTick();
  // 地图初始化
  map.value = new AMap.Map(amapId.value, {
    zoom: 14,
    center: [108.366407, 22.8177], // 中心点
    mapStyle: "amap://styles/fresh",
  });

  createRadar();
};

var radarLayer = shallowRef<AMap.CustomLayer>();
const createRadar = () => {
  var canvas = document.createElement("canvas");

  // 确保地图尺寸已经就绪
  map.value?.on("complete", () => {
    if (!map.value) return;

    canvas.width = map.value.getSize().width;
    canvas.height = map.value.getSize().height;

    radarLayer.value = new AMap.CustomLayer(canvas, {
      zooms: [2, 18],
      zIndex: 120,
      render: () => {
        initRadarCanvas(canvas)?.scan();
      },
    });

    radarLayer.value.setMap(map.value);
  });
};

// 挂载
onMounted(() => {
  if (process.client) {
    initMap();
  }
});
// 卸载
onUnmounted(() => {
  map.value?.destroy();
});
</script>

<template>
  <div class="map-page-container">
    <div class="w-full h-full relative">
      <ClientOnly>
        <div :id="amapId" class="h-full w-full"></div>
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
  z-index: 100;
}

:deep(.amap-logo) {
  display: none !important;
}
:deep(.amap-copyright) {
  display: none !important;
}
</style>
