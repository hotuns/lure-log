<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw";

const emits = defineEmits(["edited"]);

const mapEl = ref<HTMLElement>();
const map = ref<L.Map>();

const drawControl = ref<L.Control.Draw>();
const editableLayers = new L.FeatureGroup();

const center = ref([35.8617, 104.1954]);

const hasLocate = ref(false);

onMounted(() => {
  if (!mapEl.value) return;
  initMap();
});
onUnmounted(() => {
  if (!mapEl.value) return;
  mapEl.value.innerHTML = "";
  map.value?.remove();
});

const initMap = () => {
  if (!mapEl.value) return;
  map.value = L.map(mapEl.value).setView([35.8617, 104.1954], 4);

  const { satelliteTileLayer, vectorTileLayer } = useMap();
  // 默认矢量
  vectorTileLayer.addTo(map.value);
  editableLayers.addTo(map.value);
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

  addDrawControl();
  // locate();

  showConfirmDialog({
    title: "获取定位",
    cancelButtonText: "自己绘制",
    message: "自动定位到当前位置，绘制钓点范围",
  })
    .then(() => {
      // on confirm
      locate();
    })
    .catch(() => {
      // on cancel
    });
};

const addDrawControl = () => {
  if (!map.value) return;
  //   添加绘制控件
  drawControl.value = new L.Control.Draw({
    position: "topleft",
    draw: {
      // polygon: false,
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

  L.drawLocal.draw.toolbar.buttons.polygon = "绘制多边形范围";
  L.drawLocal.draw.toolbar.actions.text = "取消";
  L.drawLocal.draw.toolbar.finish.text = "完成";
  L.drawLocal.draw.toolbar.undo.text = "删除最后一个点";
  L.drawLocal.draw.handlers.polygon.tooltip.start = "点击开始绘制";
  L.drawLocal.draw.handlers.polygon.tooltip.cont = "点击继续绘制";
  L.drawLocal.draw.handlers.polygon.tooltip.end = "点击起点完成绘制";
  L.drawLocal.edit.toolbar.actions.save.text = "保存";
  L.drawLocal.edit.toolbar.actions.cancel.text = "取消";
  L.drawLocal.edit.toolbar.actions.clearAll.text = "删除所有绘制";

  map.value.addControl(drawControl.value);

  map.value.on(L.Draw.Event.TOOLBAROPENED, function (e: any) {
    console.log("TOOLBAROPENED");
  });

  map.value.on(L.Draw.Event.CREATED, function (e: any) {
    var type = e.layerType,
      layer = e.layer;

    editableLayers.addLayer(layer);
  });

  map.value.on(L.Draw.Event.EDITED, (e: any) => {
    var layers = e.layers;

    layers.eachLayer((LayerGroup: any) => {
      //获取中心点
      center.value = LayerGroup.getCenter();
    });

    let centerGeojson = {
      type: "Point",
      coordinates: [center.value[1], center.value[0]],
    };
    const geojson = editableLayers.toGeoJSON();

    // 获取多边形
    // @ts-ignore
    let polygonGeojson = geojson.features[0].geometry;

    console.log("中心点", centerGeojson);
    console.log("多边形", polygonGeojson);

    emits("edited", {
      center: JSON.stringify(centerGeojson),
      polygon: JSON.stringify(polygonGeojson),
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
    const poly = L.polygon([
      bounds.getSouthEast(),
      bounds.getNorthEast(),
      bounds.getNorthWest(),
      bounds.getSouthWest(),
    ]);
    // const rect = L.rectangle(bounds, { color: "#ff7800", weight: 1 });
    editableLayers.addLayer(poly);

    center.value = [e.latlng.lat, e.latlng.lng];
    let centerGeojson = {
      type: "Point",
      coordinates: [center.value[1], center.value[0]],
    };
    let polygonGeojson = poly.toGeoJSON().geometry;

    emits("edited", {
      center: JSON.stringify(centerGeojson),
      polygon: JSON.stringify(polygonGeojson),
    });
  });
  map.value.on("locationerror", function (e) {
    console.log("定位出错=====>", e);
    alert(e.message);
  });
};
</script>

<template>
  <div class="w-full h-full">
    <div class="z-10 h-full w-full" ref="mapEl"></div>
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
