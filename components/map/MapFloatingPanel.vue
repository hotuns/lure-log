<script setup lang="ts">
const emits = defineEmits(["open"]);

const anchors = [80, 116, Math.round(0.9 * window.innerHeight)];
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
        <van-tab title="钓点" name="a">钓点 </van-tab>
        <van-tab title="鱼种" name="b">鱼种</van-tab>
        <van-tab title="用饵" name="c">用饵</van-tab>
        <van-tab title="分析" name="d">分析</van-tab>
      </van-tabs>
    </van-floating-panel>
  </div>
</template>

<style scoped></style>
