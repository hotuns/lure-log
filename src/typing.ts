import type { Ref } from 'vue'

export type MaybeRef<T> = T | Ref<T>

// 从prisma的模型中提取出来的类型, 参数都是可选的
export type Role = 'Admin' | 'User'
export interface User {
  id?: number
  createdAt?: string
  updatedAt?: string
  status?: boolean
  username?: string
  phone?: string
  password?: string
  avatar?: string
  role?: Role
}
/** 硬度 */
export type PowerValue = 'ul' | 'l' | 'ml' | 'm' | 'mh' | 'h' | 'xh'
/** 调性 */
export type Action = 'ExtraFast' | 'Fast' | 'MediumFast' | 'Medium' | 'MediumSlow' | 'Slow'

/** 刹车 */
export type Braking = 'NoBraking' | 'SpoolTension' | 'Centrifugal' | 'Magnetic' | 'Electronic'
/** 卷线器类型 */
export type ReelType = 'Spinning' | 'Casting' | 'Conventional'

/** 钓竿 */
export interface FishingRod {
  id?: number
  createdAt?: string
  updatedAt?: string
  brand?: string
  model?: string
  length?: number
  sections?: number
  powerValue?: PowerValue
  action?: Action
}

/** 卷线器 */
export interface FishingReel {
  id?: number
  createdAt?: string
  updatedAt?: string
  type?: ReelType
  brand?: string
  model?: string
  weight?: number
  gearRatio: number
  braking: Braking
}

/** 背包 */
export interface Backpack {
  id?: number
  createdAt?: string
  updatedAt?: string
  userId?: number
  content?: string
  fishingRods?: FishingRod[]
  fishingReels?: FishingReel[]
}

/** 组合 */
export interface Combo {
  id?: number
  createdAt?: string
  updatedAt?: string
  name?: string
  fishingRod?: FishingRod
  fishingReel?: FishingReel
}

/** tag */
export interface Tag {
  id?: number
  createdAt?: string
  updatedAt?: string
  name?: string
  description?: string
}

/** 钓点 */
export interface FishSpot {
  id?: number
  createdAt?: string
  updatedAt?: string
  polygon?: any
  center?: any
  public?: boolean
  description?: string
  tags?: Tag[]
}

/** 鱼种图鉴 */
export interface FishSpecies {
  id?: number
  createdAt?: string
  updatedAt?: string
  name?: string
  description?: string
  image?: string
  fishCatch?: FishCatch[]
}

/** 鱼获 */
export interface FishCatch {
  id?: number
  createdAt?: string
  updatedAt?: string
  length?: number
  weight?: number
  Record?: Record
  species
}

/** 钓鱼记录 */
export interface Record {
  id?: number
  createdAt?: string
  updatedAt?: string
  time?: string
  description?: string

  user?: User
  fishspot?: FishSpot
  combo?: Combo
  fishCatch?: FishCatch
}
