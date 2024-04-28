import type { FishingReel, FishingRod } from "@prisma/client";

export const useBackPack = () => {
  const items = ref<{
    fishingRods: FishingRod[];
    fishingReels: FishingReel[];
  }>();

  const getBackPackItems = async () => {
    try {
      const { data } = await useHttpFetch("/api/backpack/items", {
        method: "GET",
      });
      if (data.value?.code === "success") {
        items.value = data.value.data.backpack;
      }
    } catch (error) {
      showFailToast("获取背包失败");
    }
  };

  return {
    items,
    getBackPackItems,
  };
};
