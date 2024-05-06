<script setup lang="ts">

definePageMeta({
  name: "backpack",
  layout: "home",
  title: "物品",
});

const route = useRoute();
const activeTab = ref<"items" | "combos">("items");
const beforeChange = (tab: string) => {
  refresh()
  route.query.active = tab;
  return true;
};
onMounted(() => {
  refresh()
})

const bpStore = useBackpackStore();

const { data, pending, refresh } = await useAsyncData("backpack_items", () => bpStore.loadBackPackItems());
const { data: combos } = await useAsyncData("backpack_combos", () => bpStore.loadBackPackCombos());

const showAction = ref(false);
const actions = [
  { name: '添加鱼竿' },
  { name: '添加卷线器' },
  { name: '添加组合' },
];
const onSelect = (item: any) => {
  // 默认情况下点击选项时不会自动收起
  // 可以通过 close-on-click-action 属性开启自动收起
  showAction.value = false;
  switch (item.name) {
    case '添加鱼竿':
      navigateTo({ name: 'backpack-createRod' });
      break;
    case '添加卷线器':
      navigateTo({ name: 'backpack-createReel' });
      break;
    case '添加组合':
      navigateTo({ name: 'backpack-createCombo' });
      break;
  }
};

</script>

<template>
  <div>
    <van-floating-bubble :offset="{ x: 24, y: 500 }" axis="xy" magnetic="x" icon="plus" @click="showAction = true" />

    <van-tabs v-model:active="activeTab" swipeable :before-change="beforeChange">
      <van-tab title="物品" name="items">
      </van-tab>
      <van-tab title="组合" name="combos">
      </van-tab>
    </van-tabs>


    <div v-if='activeTab === "items"'>
      <!-- 物品 -->
      <BackPackItems :fishingRods="bpStore.getOwnRods" :fishingReels="bpStore.getOwnReels" />
    </div>

    <div v-if="activeTab === 'combos'">
      <!-- 组合  -->
      <BackPackCombos :combos="bpStore.getCombos" />
    </div>

    <van-action-sheet v-model:show="showAction" description="你想要添加什么呢？" :actions="actions" @select="onSelect" />

  </div>
</template>

<style scoped></style>
