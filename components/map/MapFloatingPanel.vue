<script setup lang="ts">
import type { FishSpotDetailModel } from "~/apis/fishSpot";

const emits = defineEmits(["open"]);

const props = defineProps<{
  fishSpots: FishSpotDetailModel[];
}>();

const anchors = [80, 116, Math.round(0.7 * window.innerHeight)];
const height = ref(anchors[0]);
const active = ref();

const openPanel = () => {
  height.value = anchors[1];
};

onMounted(() => {
  setTimeout(() => {
    openPanel();
  }, 500);
});

const onClickTab = (e: any) => {
  const { title, name } = e;
  console.log("name", name);
};
</script>

<template>
  <div>
    <van-floating-panel v-model:height="height" :anchors="anchors">
      <van-tabs v-model:active="active" @click-tab="onClickTab">
        <van-tab title="钓点" name="a">
          <div>
            <van-grid :gutter="10" :column-num="4">
              <van-grid-item v-for="spot in props.fishSpots" :key="spot.id">
                <p>
                  {{ spot.description }}
                </p>
                <p>
                  <van-tag v-for="tag in spot.tags" :key="tag.id">{{
                    tag.name
                  }}</van-tag>
                </p>
              </van-grid-item>
            </van-grid>
          </div>
        </van-tab>
        <van-tab title="鱼获" name="b">鱼获</van-tab>
        <van-tab title="用饵" name="c">用饵</van-tab>
        <van-tab title="分析" name="d">分析</van-tab>
      </van-tabs>
    </van-floating-panel>
  </div>
</template>

<style scoped></style>
