<script setup lang="ts">
definePageMeta({
  title: "创建钓点",
});

const stepActive = ref(0);

const nextStep = () => {
  stepActive.value += 1;
};
const pervStep = () => {
  stepActive.value -= 1;
};

const onChange = (index: number) => {
  console.log(index);
};
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <van-steps :active="stepActive">
      <van-step>地图选点</van-step>
      <van-step>补充信息</van-step>
      <van-step>创建完成</van-step>
    </van-steps>

    <div class="h-full">
      <van-swipe
        style="height: 100%"
        :touchable="false"
        :show-indicators="false"
        :loop="false"
        @change="onChange"
      >
        <van-swipe-item>
          <client-only>
            <MapDraw />
          </client-only>
        </van-swipe-item>
        <van-swipe-item>2</van-swipe-item>
        <van-swipe-item>3</van-swipe-item>
      </van-swipe>
    </div>

    <div class="flex justify-center space-x-8xl">
      <van-button block @click="pervStep">上一步</van-button>
      <van-button block type="primary" @click="nextStep">下一步</van-button>
    </div>
  </div>
</template>

<style scoped>
.van-swipe-item {
  height: 100%;
}
</style>
