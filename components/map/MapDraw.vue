<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw";

const map = ref<L.Map>();
const drawControl = ref<L.Control.Draw>();
const editableLayers = new L.FeatureGroup();

const center = ref([35.8617, 104.1954]);

onMounted(() => {
  map.value = L.map("map").setView([35.8617, 104.1954], 4);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
  }).addTo(map.value);

  map.value.addLayer(editableLayers);

  addDrawControl();
  locate();
});

const addDrawControl = () => {
  if (!map.value) return;
  //   添加绘制控件
  drawControl.value = new L.Control.Draw({
    position: "topleft",
    draw: {
      polygon: false,
      circle: false,
      circlemarker: false,
      marker: false,
      polyline: false,
      rectangle: false,
    },
    edit: {
      remove: false,
      featureGroup: editableLayers,
    },
  });
  map.value.addControl(drawControl.value);

  map.value.on(L.Draw.Event.CREATED, function (e: any) {
    var type = e.layerType;
    var layer = e.layer;
    if (type === "marker") {
      // Do marker specific actions
    }
    // Do whatever else you need to. (save to db; add to map etc)
    map.value!.addLayer(layer);
  });

  map.value.on(L.Draw.Event.EDITED, (e: any) => {
    var layers = e.layers;
    layers.eachLayer((LayerGroup: any) => {
      //获取中心点
      center.value = LayerGroup.getCenter();
    });
  });
};

const locate = () => {
  if (!map.value) return;
  map.value.locate({
    setView: true,
    enableHighAccuracy: true,
  });
  map.value.on("locationfound", (e) => {
    console.log("locationfound");
    const bounds = e.bounds;
    // // Create a Polygon based on user's location\
    // const poly = L.polygon([
    //   bounds.getSouthEast(),
    //   bounds.getNorthEast(),
    //   bounds.getNorthWest(),
    //   bounds.getSouthWest(),
    // ], { color: "#ff7800", weight: 1 });
    const rect = L.rectangle(bounds, { color: "#ff7800", weight: 1 });
    editableLayers.addLayer(rect);

    center.value = [e.latlng.lat, e.latlng.lng];
  });
  map.value.on("locationerror", function (e) {
    console.log("定位出错=====>", e);
    alert(e.message);
  });
};

const getGeoJSON = () => {
  const geojson = editableLayers.toGeoJSON();
  console.log("GeoJSON Data: ", JSON.stringify(geojson));
  console.log("Center", center.value);
};
</script>

<template>
  <div class="w-full h-full">
    <div id="map" class="z-10" ref="map"></div>
    <van-button
      @click="getGeoJSON"
      block
      class="map-tool abs-center-x bottom-40"
    >
      下一步</van-button
    >
  </div>
</template>

<style scoped>
#map {
  width: 100%;
  height: 100%;
}
button {
  z-index: 1000; /* Ensure the button is above the map */
}
</style>
