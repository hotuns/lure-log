import type { FishingReel, FishingRod } from "@prisma/client";
import { defineStore } from "pinia";

// 背包 store
function storeSetup() {
  const ownRods = ref<FishingRod[]>([]);
  const ownReel = ref<FishingReel[]>([]);
  const getOwnRods = computed(() => ownRods.value);
  const getOwnReels = computed(() => ownReel.value);

  const { backpack } = useApi();
  const loadBackPack = async () => {
    const res = await backpack.getBackPackItems();
    if (res.success) {
      ownRods.value = res.data.backpack.fishingRods;
      ownReel.value = res.data.backpack.fishingReels;
    }
  };

  //  随机的鱼竿，供用户选择快捷创建
  const randomRods = ref<FishingRod[]>([]);
  const getRandomRods = computed(() => randomRods.value);
  const loadRandomRods = async () => {
    const res = await backpack.listRod({ limit: 6, random: true });
    if (res.success) {
      randomRods.value = res.data.rods;
    }
  };
  // 随机的卷线器
  const randomReels = ref<FishingReel[]>([]);
  const getRandomReels = computed(() => randomReels.value);
  const loadRandomReels = async () => {
    const res = await backpack.listReel({ limit: 6, random: true });
    if (res.success) {
      randomReels.value = res.data.reels;
    }
  };

  return {
    getOwnRods,
    getOwnReels,
    loadBackPack,
    getRandomRods,
    loadRandomRods,
    getRandomReels,
    loadRandomReels,
  };
}
export const useBackpackStore = defineStore("app-backpack", storeSetup, {
  persist: true,
});
