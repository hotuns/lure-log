<script lang="ts" setup>
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const mapEl = ref<HTMLElement>();
const map = shallowRef<L.Map>();

const initMap = () => {
  if (!mapEl.value) return;
  map.value = L.map(mapEl.value).setView([37.9022418, 139.0235109], 13);

  L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`, {
    maxZoom: 19,
    attribution: `© OpenStreetMap`,
  }).addTo(map.value);

  L.marker([37.9022418, 139.0235109], { opacity: 0.8 })
    .addTo(map.value)
    .bindPopup(`<b>Hello world!</b><br>I am a popup.`);
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
