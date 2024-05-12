<template>
  <main class="w-full h-full flex flex-col">
    <div class="header-container">
      <AppHeader />
    </div>

    <div class="px-10 h-full">
      <slot />
    </div>
  </main>
</template>
<style>
.header-container {
  padding-top: var(--van-nav-bar-height);
  z-index: 999;
}
</style>
