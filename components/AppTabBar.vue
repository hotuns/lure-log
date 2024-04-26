<script setup lang="ts">
const active = ref("home");
</script>

<template>
  <van-tabbar v-model="active" route>
    <van-tabbar-item replace to="/history">
      <span>记录</span>
      <template #icon>
        <div class="i-noto-v1-calendar" />
      </template>
    </van-tabbar-item>

    <van-tabbar-item replace to="/achievement">
      <span>成就</span>
      <template #icon>
        <div class="i-noto-v1-fish" />
      </template>
    </van-tabbar-item>

    <van-tabbar-item>
      <span>出击</span>
      <template #icon>
        <div class="i-noto-v1-glowing-star" />
      </template>
    </van-tabbar-item>

    <van-tabbar-item replace to="/equipment">
      <span>装备</span>
      <template #icon>
        <div class="i-noto-v1-fishing-pole" />
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
