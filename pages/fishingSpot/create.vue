<script setup lang="ts">
import type { TagModel } from "~/apis/tag";

definePageMeta({
  title: "创建钓点",
});

const spotName = ref("");
const spotDescription = ref("");
const spotTags = ref<TagModel[]>([]);

const { fetchTags, tags } = useTagStore();
await useAsyncData("tags", fetchTags);

const showTags = ref(false);
</script>

<template>
  <div class="space-y-6xl pt-10">
    <van-cell-group>
      <van-field
        v-model="spotName"
        name="spotName"
        label="钓点名称"
        placeholder="为钓点取个名字吧"
        :rules="[{ required: true, message: '取个名字方便记忆' }]"
      />
      <van-field
        v-model="spotDescription"
        name="spotDescription"
        label="描述信息"
        placeholder="随便写点什么吧"
        :rules="[{ required: true, message: '' }]"
      />

      <van-cell title="标签" is-link @click="showTags = true">
        <template #right-icon>
          <van-tag v-for="tag in spotTags" :key="tag.id">
            {{ tag.name }}
          </van-tag>
        </template>
      </van-cell>

      <van-popup v-model:show="showTags" >
        <!-- 选择标签或者新建 -->
        <div>
          <template v-for="tag in tags" :key="tag.id">
            
            <van-tag plain type="primary">标签</van-tag>
          </template>
        </div>
      </van-popup>
    </van-cell-group>

    <van-cell-group>
      <van-cell title="范围选择" />
      <div class="w-full h-4xl p-xl">
        <ClientOnly>
          <MapLeaflet />
        </ClientOnly>
      </div>
    </van-cell-group>
  </div>
</template>

<style scoped>
.van-swipe-item {
  height: 100%;
}
</style>
