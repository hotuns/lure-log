<script setup lang="ts">
const props = defineProps({
  reelList: { type: Array, required: true },
});

const { reelList: list } = toRefs(props);

// 纺车轮（SpinningReel）、水滴轮（Low-ProfileReel）和鼓式轮（RoundBaitcastReel）

const filter = ref({
  type: "all",
  brand: "all",
});
const filterOptions = {
  type: [
    { text: "全部类型", value: "all" },
    { text: "纺车轮", value: "lure" },
    { text: "水滴轮", value: "bass" },
    { text: "鼓轮", value: "carp" },
  ],
  brand: [
    { text: "全部品牌", value: "all" },
    { text: "Daiwa", value: "daiwa" },
    { text: "Shimano", value: "shimano" },
    { text: "Abu Garcia", value: "abu" },
  ],
};
</script>

<template>
  <div>
    <van-dropdown-menu>
      <van-dropdown-item v-model="filter.type" :options="filterOptions.type" />
      <van-dropdown-item v-model="filter.brand" :options="filterOptions.brand" />
    </van-dropdown-menu>

    <van-cell-group>
      <van-cell center v-for="i in list" title="纺车轮" value="详情" label="描述信息" is-link>
        <template #icon>
          <van-image class="mr-4" width="50" height="50" src="/纺车轮2.webp" />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<style scoped></style>
