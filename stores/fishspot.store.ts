import type { FishSpotDetailModel, FishSpotModel } from "~/apis/fishSpot";

function storeSetup() {
  const fishSpots = ref<FishSpotModel[]>([]);
  const fishFullSpots = ref<FishSpotDetailModel[]>([]);

  const setFishspots = (data: FishSpotModel[]) => {
    fishSpots.value = data;
  };
  const fetchFishspots = async () => {
    const { fishSpot } = useApi();
    const res = await fishSpot.fishSpotList();
    if (res.success) {
      fishSpots.value = res.data.fishSpots;
    }
  };

  const fetchFishFullSpots = async () => {
    const { fishSpot } = useApi();
    const res = await fishSpot.fishSpotListHasFull();
    if (res.success) {
      fishFullSpots.value = res.data.fishSpots;
    }
  };

  const addFishspot = async (data: {
    public: boolean;
    description: string;
    tags: number[];
    center: string;
    polygon: string;
  }) => {
    const { fishSpot } = useApi();
    const res = await fishSpot.createFishSpot(data);
    if (res.success) {
      fetchFishspots();
      showSuccessToast("创建成功");
    } else {
      showFailToast("创建失败");
    }
  };

  return {
    fishFullSpots,
    fetchFishFullSpots,
    fishSpots,
    setFishspots,
    addFishspot,
    fetchFishspots,
  };
}

export const useFishspotStore = defineStore({
  id: "fishSpot",
  state: storeSetup,
});
