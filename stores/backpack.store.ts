import type { FishingReel, FishingRod } from "@prisma/client";
import { defineStore } from "pinia";

// 背包 store
function storeSetup() {
  // ref() 就是 state 属性
  // computed() 就是 getters
  // function() 就是 actions

  const ownRods = ref<FishingRod[]>([]);
  const ownReel = ref<FishingReel[]>([]);
  const getOwnRods = computed(() => ownRods.value);
  const getOwnReels = computed(() => ownReel.value);

  const { backpack } = useApi();

  async function loadBackPackItems() {
    const res = await backpack.getBackPackItems();
    if (res.success) {
      ownRods.value = res.data.backpack.fishingRods;
      ownReel.value = res.data.backpack.fishingReels;
      return Promise.resolve(res.data.backpack);
    } else {
      return Promise.reject();
    }
  }

  //  随机的鱼竿，供用户选择快捷创建
  const randomRods = ref<FishingRod[]>([]);
  const getRandomRods = computed(() => randomRods.value);
  async function loadRandomRods() {
    const res = await backpack.listRod({ limit: 6, random: true });
    if (res.success) {
      randomRods.value = res.data.rods;
      return Promise.resolve(res.data.rods);
    } else {
      return Promise.reject();
    }
  }

  // 随机的卷线器
  const randomReels = ref<FishingReel[]>([]);
  const getRandomReels = computed(() => randomReels.value);
  async function loadRandomReels() {
    const res = await backpack.listReel({ limit: 6, random: true });
    if (res.success) {
      randomReels.value = res.data.reels;
      return Promise.resolve(res.data.reels);
    } else {
      return Promise.reject();
    }
  }

  return {
    getOwnRods,
    getOwnReels,
    loadBackPackItems,
    getRandomRods,
    getRandomReels,
    loadRandomReels,
    loadRandomRods,
  };
}
export const useBackpackStore = defineStore("app-backpack", storeSetup, {
  persist: true,
});
