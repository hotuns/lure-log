import type {
  Action,
  Backpack,
  FishingReel,
  FishingRod,
  PowerValue,
} from "@prisma/client";

// 背包
enum backpackApi {
  items = "/api/backpack/items",
  add = "/api/backpack/add",
  delete = "/api/backpack/delete",
}

export async function getBackPackItems() {
  return useHttp.get<{
    backpack: {
      id: number;
      fishingRods: FishingRod[];
      fishingReels: FishingReel[];
    };
  }>(backpackApi.items);
}

// 鱼竿
enum rodApi {
  create = "/api/rod/create",
  list = "/api/rod/list",
  search = "/api/rod/search",
  update = "/api/rod/update",
}

export interface RodParams {
  brand: string;
  model: string;
  length: number;
  sections: number;
  powerValue: string;
  action: string;
}

export async function createRod(opt: RodParams) {
  return useHttp.post<{}>(rodApi.create, opt);
}
export async function listRod(query: { limit: number; random: boolean }) {
  return useHttp.get<{ rods: FishingRod[] }>(rodApi.list, query);
}
export async function searchRod(query: { keyword: string }) {
  return useHttp.get<{ rods: FishingRod[] }>(rodApi.search, query);
}
export async function updateRod(id: number, opt: RodParams) {
  return useHttp.post<{}>(rodApi.update, { id, ...opt });
}

// 卷线器
enum reelApi {
  create = "/api/reel/create",
  list = "/api/reel/list",
  search = "/api/reel/search",
  update = "/api/reel/update",
}

interface ReelParams {
  brand: string;
  model: string;
  type: string;
  weight: number;
  gearRatio: number;
  braking: string;
}

export async function createReel(opt: ReelParams) {
  return useHttp.post<{}>(reelApi.create, opt);
}
export async function listReel(query: { limit: number; random: boolean }) {
  return useHttp.get<{ reels: FishingReel[] }>(reelApi.list, query);
}
export async function searchReel(query: { keyword: string }) {
  return useHttp.get<{ reels: FishingReel[] }>(reelApi.search, query);
}
export async function updateReel(id: number, opt: ReelParams) {
  return useHttp.post<{}>(reelApi.update, { id, ...opt });
}
