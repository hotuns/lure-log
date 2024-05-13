<script setup lang="ts">
import type { TagModel } from "~/apis/tag";

definePageMeta({
  title: "创建钓点",
});

const { fishspot } = useApi();

const spotDescription = ref("");
const spotTags = ref<TagModel[]>([]);
const spotCenter = ref("");
const stotPolygon = ref("");
const mapEdited = (e: { center: string; polygon: string }) => {
  if (e.center) {
    spotCenter.value = e.center;
  }
  if (e.polygon) {
    stotPolygon.value = e.polygon;
  }
};

const createRecord = async () => {
  // 检查参数是否完整
  if (!unref(spotDescription) || !spotCenter || !stotPolygon) {
    showFailToast("请填写完整信息");
    return;
  }

  // 提交
  let newRecord = {
    description: unref(spotDescription),
    tags: unref(spotTags).map((tag) => tag.id),
    center: unref(spotCenter),
    polygon: unref(stotPolygon),
  };

  const { data } = await useAsyncData("createFishSpot", () =>
    fishspot.createFishingSpot(newRecord)
  );
  if (data.value?.success) {
    showSuccessToast("创建成功");
    navigateTo({ name: "fishspot" });
  } else {
    showFailToast("创建失败");
  }
};
</script>

<template>
  <div class="space-y-6xl pt-10 flex flex-col h-full">
    <van-cell-group>
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
