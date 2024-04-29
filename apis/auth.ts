import type { User } from "@prisma/client";

export interface LoginParams {
  password: string;
  phone?: string;
  username?: string;
  email?: string;
}
export type LoginResultModel = {
  token: string;
  user: Omit<User, "password">;
};

export interface RegisterParams {
  password: string;
  phone: string;
  username: string;
  email?: string;
}

enum Api {
  login = "/api/auth/login",
  register = "/api/auth/register",
  update = "/api/auth/update",
}

export async function login(params: LoginParams) {
  return useHttp.post<LoginResultModel>(Api.login, params);
}

export async function register(params: RegisterParams) {
  return useHttp.post(Api.register, params);
}

export async function update(params: {
  phone: string;
  username: string;
  email?: string;
  avatar?: string;
}) {
  return useHttp.post<{ user: Omit<User, "password"> }>(Api.update, params);
}
