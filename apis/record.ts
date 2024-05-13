enum Api {
  create = "/api/record/create",
  delete = "/api/record/delete",
  update = "/api/record/update",
  list = "/api/record/list",
}

export interface RecordModel {
  id: number;
  time: string;
  description: string;
  comboId: string;
  fishingSpotId: string;
  fishCatch: {
    speciesId: string;
    length: number;
    weight: number;
  };
}

export function createRecord(params: RecordModel) {
  return useHttp.post(Api.create, params);
}

export function deleteRecord(params: { id: string }) {
  return useHttp.post(Api.delete, params);
}

export function updateRecord(params: RecordModel) {
  return useHttp.post(Api.update, params);
}

export function recordsList() {
  return useHttp.get<{ records: RecordModel[] }>(Api.list);
}
