import type {
  Braking,
  FishingReel,
  FishingRod,
  ReelType,
} from "@prisma/client";

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

  const createRod = async (opt: {
    brand: string;
    model: string;
    length: number;
    sections: number;
    powerValue: string;
    action: string;
  }) => {
    try {
      const { data } = await useHttpFetch("/api/rod/create", {
        method: "POST",
        body: opt,
      });
      if (data.value?.code === "success") {
        return data.value.data.rod;
      }
    } catch (error) {
      showFailToast("创建鱼竿失败");
    }
  };

  const createReel = async (opt: {
    brand: string;
    model: string;
    type: ReelType;
    weight: number;
    gearRatio: number;
    braking: Braking;
  }) => {
    try {
      const { data } = await useHttpFetch("/api/reel/create", {
        method: "POST",
        body: opt,
      });
      if (data.value?.code === "success") {
        return data.value.data.reel;
      }
    } catch (error) {
      showFailToast("创建卷线器失败");
    }
  };

  return {
    items,
    getBackPackItems,
    createRod,
    createReel,
  };
};
