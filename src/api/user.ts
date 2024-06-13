import type { Backpack, User } from '@/typing'
import request from '@/utils/request'
import type { ResponseBody } from './typing'

export interface LoginData {
  method: 'phone' | 'password'
  phone?: string
  username?: string
  password: string
}

export interface LoginRes {
  token: string
}

export interface UserInfoRes {
  token: string
  user: User
  backpack: Backpack
}

export function login(data: LoginData) {
  return request.post<ResponseBody<LoginRes>>('/auth/login', data)
}

export function logout() {
  return request.post('/user/logout')
}

export function getUserInfo() {
  return request<UserInfoRes>('/auth/info')
}
