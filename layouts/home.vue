<template>
  <main class="w-full h-full flex flex-col">
    <div class="h-full">
      <slot />
    </div>

    <div class="tabbar-container">
      <AppTabBar />
    </div>
  </main>
</template>

<style>
.tabbar-container {
  height: var(--van-tabbar-height);
  z-index: 999;
}
</style>
