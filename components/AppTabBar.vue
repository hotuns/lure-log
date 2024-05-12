<script setup lang="ts">
const active = ref("home");
</script>

<template>
  <van-tabbar v-model="active" route>
    <van-tabbar-item replace to="/map">
      <span>地图</span>
      <template #icon>
        <div class="i-noto-v1-sunrise" />
      </template>
    </van-tabbar-item>

    <van-tabbar-item replace to="/achievement">
      <span>成就</span>
      <template #icon>
        <div class="i-noto-v1-fish" />
      </template>
    </van-tabbar-item>

    <van-tabbar-item to="/record/create">
      <span>上鱼了</span>
      <template #icon>
        <div class="i-noto-v1-fishing-pole" />
      </template>
    </van-tabbar-item>

    <van-tabbar-item replace to="/backpack">
      <span>物品</span>
      <template #icon>
        <div class="i-noto-v1-backpack" />
      </template>
    </van-tabbar-item>

    <van-tabbar-item replace to="/user">
      <span>我的</span>
      <template #icon>
        <div class="i-noto-v1-bust-in-silhouette" />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>
