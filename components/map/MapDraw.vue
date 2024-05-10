<script setup lang="ts">
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw";

const map = ref();
const drawControl = ref();
const polygonDrawer = ref();

onMounted(() => {
  map.value = L.map("map").setView([46.05, 11.05], 5);

  L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map.value);

  L.marker([50, 14]).addTo(map.value);

  // Initialize the Leaflet.draw control
  const editableLayers = new L.FeatureGroup();
  map.value.addLayer(editableLayers);

  let options: any = {
    position: "topleft",
    draw: {
      polygon: {
        allowIntersection: false, // Restricts shapes to simple polygons
        drawError: {
          color: "#e1e100", // Color the shape will turn when intersects
          message: "<strong>Oh snap!<strong> you can't draw that!", // Message that will show when intersect
        },
        shapeOptions: {
          color: "#0000FF",
        },
      },
      circle: false,
      rectangle: false,
      marker: false,
      circlemarker: false,
      polyline: false,
    },
    edit: {
      featureGroup: editableLayers, //REQUIRED!!
      remove: false,
    },
  };

  drawControl.value = new L.Control.Draw(options);
  map.value.addControl(drawControl.value);

  // Translate Dictionary
  setTimeout(() => {
    L.drawLocal.draw.toolbar.buttons.polygon = "رسم چندضلعی";
    L.drawLocal.draw.handlers.polygon.tooltip.start = "جهت رسم شکل کلیک کنید";
    L.drawLocal.draw.handlers.polygon.tooltip.cont = "جهت تکمیل رسم کلیک کنید";
    L.drawLocal.draw.handlers.polygon.tooltip.end =
      "برای تکمیل رسم شکل ، آن را به نقطه ابتدایی وصل کنید";

    L.drawLocal.draw.toolbar.undo.title = "حذف آخرین نقطه رسم شده";
    L.drawLocal.draw.toolbar.undo.text = "حذف آخرین نقطه";

    L.drawLocal.draw.toolbar.finish.title = "پایان رسم";
    L.drawLocal.draw.toolbar.finish.text = "پایان";

    L.drawLocal.draw.toolbar.actions.title = "لغو رسم";
    L.drawLocal.draw.toolbar.actions.text = "لغو";

    polygonDrawer.value = new L.Draw.Polygon(map.value);

    console.log("L.drawLocal.draw.toolbar : ", L.drawLocal.draw.toolbar);
  }, 1000);

  map.value.on("draw:created", (e: any) => {
    console.log("e : ", e);
    const layer = e.layer;
    const coordinates = layer._latlngs;
    console.log("Created coordinates : ", coordinates);
    editableLayers.addLayer(layer);
  });

  map.value.on("draw:edited", (e: any) => {
    var layers = e.layers;
    layers.eachLayer((layer: any) => {
      console.log("layer : ", layer);
      const coordinates = layer._latlngs;
      console.log("Edited coordinates : ", coordinates);
    });
  });
});

const doCreate = () => {
  drawControl.value._toolbars.draw.options.polygon = {
    allowIntersection: false, // Restricts shapes to simple polygons
    drawError: {
      color: "#e1e100", // Color the shape will turn when intersects
      message: "<strong>Oh snap!<strong> you can't draw that!", // Message that will show when intersect
    },
    shapeOptions: {
      color: "#0000FF",
    },
  };
  map.value.addControl(drawControl.value);
  new L.Draw.Polygon(map.value, drawControl.value.options.polygon).enable();
};
const doDelete = () => {
  drawControl.value._toolbars.draw.options.polygon = false;
  map.value.addControl(drawControl.value);
};

const doEnable = () => {
  // new L.Draw.Polygon(map.value, drawControl.value.options.polygon).enable();
  //
  // new L.EditToolbar.Edit(map.value, {
  //   featureGroup: drawControl.value.options.featureGroup,
  //   selectedPathOptions: drawControl.value.options.edit.selectedPathOptions
  // })
  // new L.EditToolbar.Delete(map.value, {
  //   featureGroup: drawControl.value.options.featureGroup
  // })

  polygonDrawer.value.enable();
};

const doDisable = () => {
  new L.Draw.Polygon(map.value, drawControl.value.options.polygon).disable();
};
</script>

<template>
  <div style="height: 100vh; width: 100vw">
    <div id="map" class="z-10" ref="map"></div>

    <div class="fixed flex flex-row bottom-3 right-3 z-50">
      <div
        class="bg-green-400 text-white py-2 px-3 z-50 cursor-pointer"
        @click="doEnable"
      >
        Enable
      </div>
      <div
        class="bg-rose-400 text-white py-2 px-3 z-50 cursor-pointer"
        @click="doDisable"
      >
        Disable
      </div>
      <div
        class="bg-blue-400 text-white py-2 px-3 z-50 cursor-pointer"
        @click="doCreate"
      >
        Create Tools
      </div>
      <div
        class="bg-red-400 text-white py-2 px-3 cursor-pointer"
        @click="doDelete"
      >
        Delete Tools
      </div>
    </div>
  </div>
</template>

<style scoped>
#map {
  width: 100vw;
  height: 100vh;
}
</style>
