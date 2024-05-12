import { defineStore } from "pinia";
import type { TagModel } from "~/apis/tag";
import { useApi } from "~/composables/useApi";

function storeSetup() {
  const tags = ref<TagModel[]>([]);
  const getTags = computed(() => tags.value);
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

  return {
    tags,
    getTags,
    setTags,
    fetchTags,
  };
}

export const useTagStore = defineStore({
  id: "tag",
  state: storeSetup,
});
