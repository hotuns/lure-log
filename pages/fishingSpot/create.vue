<script setup lang="ts">
definePageMeta({
  title: "创建钓点",
});
</script>

<template>
  <div>
    <client-only>
      <MapDraw />
    </client-only>
  </div>
</template>

<style scoped>
#map {
  width: 100vw;
  height: 100vh;
}
</style>
