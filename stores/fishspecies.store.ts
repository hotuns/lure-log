import type { FishSpeciesModel } from "~/apis/fishSpecies";

// 鱼类store
function storeSetup() {
  const fishSpecies = ref<FishSpeciesModel[]>([]);

  const setFishSpecies = (data: FishSpeciesModel[]) => {
    fishSpecies.value = data;
  };

  const fetchFishSpecies = async () => {
    const { fishSpecies: fishSpeciesApi } = useApi();
    const res = await fishSpeciesApi.fishSpeciesList();
    if (res.success) {
      fishSpecies.value = res.data.fishSpecies;
    }
  };

  return {
    fishSpecies,
    setFishSpecies,
    fetchFishSpecies,
  };
}

export const useFishSpeciesStore = defineStore({
  id: "fishSpecies",
  state: storeSetup,
});
