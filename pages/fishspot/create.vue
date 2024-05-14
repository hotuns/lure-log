<script setup lang="ts">
import type { TagModel } from "~/apis/tag";

definePageMeta({
  name: "fishSpot-create", // 'fishspot-create' is the name of the page, which is used to navigate to this page
  title: "创建钓点",
});

const spotPublic = ref(false);
const spotDescription = ref("");
const spotTags = ref<TagModel[]>([]);
const spotCenter = ref("");
const stotPolygon = ref("");
const mapEdited = (e: { center: string; polygon: string }) => {
  console.log("on map edited", e);
  if (e.center) {
    spotCenter.value = e.center;
  }
  if (e.polygon) {
    stotPolygon.value = e.polygon;
  }
};

const fishSpotStore = useFishspotStore();

const createRecord = async () => {
  // 检查参数是否完整
  if (!unref(spotDescription) || !spotCenter || !stotPolygon) {
    showFailToast("请填写完整信息");
    return;
  }

  // 提交
  let newRecord = {
    public: unref(spotPublic),
    description: unref(spotDescription),
    tags: unref(spotTags).map((tag) => tag.id),
    center: unref(spotCenter),
    polygon: unref(stotPolygon),
  };
  await fishSpotStore.addFishspot(newRecord);
  navigateTo({ name: "fishspot" });
};
</script>

<template>
  <div class="space-y-6xl pt-10 flex flex-col h-full">
    <van-cell-group>
      <van-field name="spotPublic" label="是否公开">
        <template #input>
          <van-switch v-model="spotPublic" />
        </template>
      </van-field>

      <van-field
        v-model="spotDescription"
        name="spotDescription"
        label="描述信息"
        placeholder="随便写点什么吧"
        :rules="[{ required: true, message: '' }]"
      />

      <TagsSelect v-model="spotTags" />
    </van-cell-group>

    <van-cell-group class="h-full flex flex-col">
      <van-cell title="范围选择" />
      <div class="h-full p-xl">
        <ClientOnly>
          <MapDraw @edited="mapEdited" />
        </ClientOnly>
      </div>
    </van-cell-group>

    <van-button block size="large" type="primary" @click="createRecord"
      >创建</van-button
    >
  </div>
</template>

<style scoped>
.van-swipe-item {
  height: 100%;
}
</style>
