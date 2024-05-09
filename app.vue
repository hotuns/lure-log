<script setup lang="ts">
import type { ConfigProviderTheme } from "vant";

useHead({
  title: "路亚记",
  meta: [
    {
      name: "apple-mobile-web-app-capable",
      content: "yes",
    },
    {
      name: "apple-mobile-web-app-status-bar-style",
      content: "black",
    },
    {
      name: "format-detection",
      content: "telephone=no",
    },
    {
      name: "viewport",
      content:
        "width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no",
    },
  ],
});

const color = useColorMode();
const mode = computed(() => color.value as ConfigProviderTheme);
</script>

<template>
  <VanConfigProvider :theme="mode">
    <ColorScheme tag="div">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </ColorScheme>
  </VanConfigProvider>
</template>

<style>
#__nuxt {
  height: 100vh;
  margin: 0;
  padding: 0;
}

.van-config-provider {
  height: 100%;
  width: 100%;
}

html {
  background: var(--van-gray-1);
  color-scheme: light;
}

html.dark {
  background: #222;
  color-scheme: dark;
}
</style>
