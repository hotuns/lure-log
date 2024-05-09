<script setup lang="ts">
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
  <div class="h-full w-full">
    <ClientOnly>
      <div :id="amapId" class="h-full w-full"></div>
    </ClientOnly>
  </div>
</template>

<style scoped>
:deep(.amap-logo) {
  display: none !important;
}
:deep(.amap-copyright) {
  display: none !important;
}
</style>
