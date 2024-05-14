import type { RecordModel } from "./record";
import type { TagModel } from "./tag";

enum Api {
  create = "/api/fishspot/create",
  delete = "/api/fishspot/delete",
  update = "/api/fishspot/update",
  list = "/api/fishspot/list",
}

export interface FishSpotModel {
  id: number;
  description: string;
  center: string;
  polygon: string;
}

export interface FishSpotDetailModel extends FishSpotModel {
  tags?: TagModel[];
  records?: RecordModel[];
}

export interface CreateParams {
  public: boolean;
  description: string;
  center: string;
  polygon: string;
}

export function fishSpotList() {
  return useHttp.get<{ fishSpots: FishSpotModel[] }>(Api.list);
}

export function fishSpotListHasFull() {
  return useHttp.get<{ fishSpots: FishSpotDetailModel[] }>(Api.list, {
    hasTags: true,
    hasRecords: true,
  });
}

export function createFishSpot(params: CreateParams) {
  return useHttp.post(Api.create, params);
}
