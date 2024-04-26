<script setup lang="ts">
import { RellType, type Equipment, type Reel } from "~/types";

definePageMeta({
  layout: "home",
  title: "我的装备",
});

// 鱼竿
const rodList = ref([
  {
    id: 1,
    name: "路亚竿1",
    img: "https://fish.shimano.com/content/dam/Shimanofish/LocalJP/Contentsrelated/product/rod/common/rod_09.jpg",
  },
  {
    id: 2,
    name: "路亚竿1",
    img: "https://fish.shimano.com/content/dam/Shimanofish/LocalJP/Contentsrelated/product/rod/common/rod_09.jpg",
  },
]);

// 渔轮
const reelList = ref([
  {
    id: 1,
    name: "纺车轮",
    img: "https://fish.shimano.com/content/dam/Shimanofish/LocalJP/Contentsrelated/product/reel/common/reel_01.jpg",
  },
  {
    id: 2,
    name: "两轴轮",
    img: "https://fish.shimano.com/content/dam/Shimanofish/LocalJP/Contentsrelated/product/reel/common/reel_05.jpg",
  },
]);

const lureList = ref([
  {
    id: 1,
    name: "鱼饵1",
    img: "https://img1.baidu.com/it/u=1860000009,4240000009&fm=26&fmt=auto&gp=0.jpg",
  },
  {
    id: 2,
    name: "鱼饵2",
    img: "https://fish.shimano.com/content/dam/Shimanofish/LocalJP/Contentsrelated/product/reel/common/reel_05.jpg",
  },
]);

const route = useRoute();
const active = (route.query.active as string) || "rod";
const activeTab = ref<string>(active);
const beforeChange = (tab: string) => {
  console.log("beforeChange", tab);
  // change query
  route.query.active = tab;

  return true;
};
</script>

<template>
  <van-tabs v-model:active="activeTab" :before-change="beforeChange">
    <van-tab title="鱼竿" name="rod">
      <EquipmentRod :rodList="rodList" />
    </van-tab>
    <van-tab title="渔轮" name="reel">
      <EquipmentReel :reelList="reelList" />
    </van-tab>
    <van-tab title="诱饵" name="lure">
      <EquipmentLure :lureList="lureList" />
    </van-tab>
  </van-tabs>
</template>

<style scoped></style>
