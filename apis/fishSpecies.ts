enum Api {
  create = "/api/fishspecies/create",
  delete = "/api/fishspecies/delete",
  update = "/api/fishspecies/update",
  list = "/api/fishspecies/list",
}

export interface FishSpeciesModel {
  id: number;
  name: string;
  description: string;
  image: string;
}

export interface CreateParams {
  name: string;
  description: string;
  image: string;
}

export function fishSpeciesList() {
  return useHttp.get<{ fishSpecies: FishSpeciesModel[] }>(Api.list);
}
export function searchFishSpecies(params: { name: string }) {
  return useHttp.get<{ fishSpecies: FishSpeciesModel[] }>(Api.list, params);
}
