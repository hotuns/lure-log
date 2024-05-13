<script setup lang="ts">
import type { FishingSpotModel } from "~/apis/fishSpot";

const { fishspot } = useApi();

const { data } = await useAsyncData("fishspot", () =>
  fishspot.fishingSpotList()
);
const fishSpots = ref<FishingSpotModel[]>([]);

if (data.value?.success) {
  console.log(data.value.data);
  fishSpots.value = data.value.data.spots;
} else {
  console.log(data.value);
}
</script>

<template>
  <div>
    <van-cell-group>
      <van-cell
        v-for="spot in fishSpots"
        :key="spot.id"
        :title="spot.description"
        is-link
      />
    </van-cell-group>
  </div>
</template>

<style scoped></style>
