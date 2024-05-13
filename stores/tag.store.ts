import { defineStore } from "pinia";
import type { TagModel } from "~/apis/tag";
import { useApi } from "~/composables/useApi";

function storeSetup() {
  const tags = ref<TagModel[]>([]);
  const setTags = (data: TagModel[]) => {
    tags.value = data;
  };
  const fetchTags = async () => {
    const { tag } = useApi();
    const res = await tag.tagsList();
    if (res.success) {
      tags.value = res.data.tags;
    }
  };

  const addTag = async (data: { name: string; description?: string }) => {
    const { tag } = useApi();
    const res = await tag.createTag(data);
    if (res.success) {
      fetchTags();
    }
  };

  return {
    tags,
    setTags,
    addTag,
    fetchTags,
  };
}

export const useTagStore = defineStore({
  id: "tag",
  state: storeSetup,
});
