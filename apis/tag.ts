import type { Tag } from "@prisma/client";

enum Api {
  create = "/api/tag/create",
  delete = "/api/tag/delete",
  update = "/api/tag/update",
  list = "/api/tag/list",
}

export interface CreateParams {
  name: string;
  description?: string;
}

export interface TagModel {
  id: number;
  name: string;
  description?: string;
}

export function createTag(params: CreateParams) {
  return useHttp.post(Api.create, params);
}

export function tagsList() {
  return useHttp.get<{ tags: TagModel[] }>(Api.list);
}
