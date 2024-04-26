<script setup lang="ts">
const props = defineProps({
  rodList: { type: Array, required: true },
});

const { rodList: list } = toRefs(props);

const filter = ref({
  type: "all",
  brand: "all",
});
const filterOptions = {
  type: [
    { text: "全部类型", value: "all" },
    { text: "路亚竿", value: "lure" },
    { text: "鲤鱼竿", value: "carp" },
    { text: "鲈鱼竿", value: "bass" },
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
      <van-cell center v-for="i in list" title="路亚竿" value="详情" label="描述信息" is-link to="/equipment/10">
        <template #icon>
          <van-image class="mr-4" width="50" height="50" src="/纺车轮.png" />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<style scoped></style>
