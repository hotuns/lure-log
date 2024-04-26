<script setup lang="ts">
const props = defineProps({
  lureList: { type: Array, required: true },
});

const { lureList: list } = toRefs(props);

const filter = ref({
  type: "all",
  brand: "all",
});
const filterOptions = {
  type: [
    { text: "全部类型", value: "all" },
    { text: "硬饵", value: "lure" },
    { text: "软饵", value: "carp" },
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
      <van-cell center v-for="i in list" title="波爬" value="详情" label="描述信息" is-link>
        <template #icon>
          <van-image class="mr-4" width="50" height="50" src="/纺车轮.png" />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<style scoped></style>
