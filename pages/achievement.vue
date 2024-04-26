<script setup lang="ts">
definePageMeta({
  layout: "home",
});
</script>

<template>
  <van-grid :gutter="10" :column-num="4">
    <van-grid-item v-for="value in 6" :key="value" icon="photo-o">
      <template #text>
        <p>翘嘴</p>
        <p>10cm</p>
      </template>
    </van-grid-item>
  </van-grid>
</template>

<style scoped></style>
