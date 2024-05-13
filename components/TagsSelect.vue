<script setup lang="ts">
import type { TagModel } from "~/apis/tag";

const model = defineModel<TagModel[]>();

const tagStore = useTagStore();

await useAsyncData("tags", tagStore.fetchTags);

const isTagSelected = (tag: TagModel) => {
  let r = model.value?.some((t) => t.id === tag.id);
  return r ? "success" : "default";
};

const showTags = ref(false);

const searchTxt = ref("");
const tagslist = computed(() => {
  if (!searchTxt.value.length) return tagStore.tags;
  return tagStore.tags.filter((tag) => tag.name.includes(searchTxt.value));
});

const onTagClick = (tag: TagModel) => {
  if (model.value?.some((t) => t.id === tag.id)) {
    model.value = model.value.filter((t) => t.id !== tag.id);
  } else {
    model.value?.push(tag);
  }
};

const showCreate = ref(false);
const newTag = ref({
  name: "",
  description: "",
});
const onCreate = () => {
  tagStore.addTag(newTag.value);
  showCreate.value = false;
  //   model.value = model.value?.concat(tagStore.tags.slice(-1));

  newTag.value = { name: "", description: "" };
};
</script>

<template>
  <van-cell title="标签" is-link @click="showTags = true">
    <template #label>
      <van-tag plain v-for="tag in model" :key="tag.id">
        {{ tag.name }}
      </van-tag>
    </template>
  </van-cell>

  <van-popup v-model:show="showTags" position="bottom" style="height: 80%">
    <!-- 选择标签或者新建 -->
    <div class="p-xl">
      <van-cell-group>
        <div class="flex items-center space-x-2xl py-2xl">
          <van-tag
            v-for="tag in model"
            :key="tag.id"
            size="large"
            type="success"
            >{{ tag.name }}</van-tag
          >
        </div>

        <van-field v-model="searchTxt" label="" placeholder="选择或搜索标签" />
      </van-cell-group>

      <van-divider />

      <div class="flex items-center space-x-2xl px-2xl">
        <template v-for="tag in tagslist" :key="tag.id">
          <van-tag
            size="large"
            :type="isTagSelected(tag)"
            @click="onTagClick(tag)"
            >{{ tag.name }}</van-tag
          >
        </template>

        <van-button icon="plus" size="mini" @click="showCreate = true"
          >添加</van-button
        >
      </div>
    </div>
  </van-popup>

  <van-popup v-model:show="showCreate" position="bottom" style="height: 50%">
    <div class="p-xl">
      <van-field
        v-model="newTag.name"
        label="名称"
        placeholder="输入标签名称"
      />
      <van-field
        v-model="newTag.description"
        label="描述"
        placeholder="输入标签描述，可以不填"
      />
      <van-button type="primary" block @click="onCreate">创建</van-button>
    </div>
  </van-popup>
</template>

<style scoped></style>
