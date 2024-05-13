enum Api {
  create = "/api/fishspot/create",
  delete = "/api/fishspot/delete",
  update = "/api/fishspot/update",
  list = "/api/fishspot/list",
}

export interface FishingSpotModel {
  id: number;

  description: string;
  center: string;
  polygon: string;
}

export interface CreateParams {
  description: string;
  center: string;
  polygon: string;
}

export function fishingSpotList() {
  return useHttp.get<{ spots: FishingSpotModel[] }>(Api.list);
}

export function createFishingSpot(params: CreateParams) {
  return useHttp.post(Api.create, params);
}
