<script setup lang="ts">
import { storeToRefs } from 'pinia'
import useAppStore from '@/stores/modules/app'
import useRouteCache from '@/stores/modules/routeCache'
import useRouteTransitionNameStore from '@/stores/modules/routeTransitionName'
import useAutoThemeSwitcher from '@/hooks/useAutoThemeSwitcher'

const { t } = useI18n()

useHead({
  title: t('app.title'),
  meta: [
    {
      name: 'description',
      content: t('app.description'),
    },
    {
      name: 'theme-color',
      content: () => isDark.value ? '#00aba9' : '#ffffff',
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      // href: () => preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg',
      href: '/favicon.ico',
    },
  ],
})

const appStore = useAppStore()
const { mode } = storeToRefs(appStore)

const routeTransitionNameStore = useRouteTransitionNameStore()
const { routeTransitionName } = storeToRefs(routeTransitionNameStore)
const { initializeThemeSwitcher } = useAutoThemeSwitcher(appStore)

const keepAliveRouteNames = computed(() => {
  return useRouteCache().routeCaches as string[]
})

onMounted(() => {
  initializeThemeSwitcher()
})
</script>

<template>
  <VanConfigProvider :theme="mode">
    <NavBar />
    <router-view v-slot="{ Component, route }">
      <transition :name="routeTransitionName">
        <keep-alive :include="keepAliveRouteNames">
          <component :is="Component" :key="route.name" />
        </keep-alive>
      </transition>
    </router-view>
    <TabBar />
  </VanConfigProvider>
</template>
