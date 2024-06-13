export interface ResponseBody<T = any> {
  header: {
    status: number
    requestId?: string
    message: string
  }
  content?: T
}

/** 统一返回结构体 */

export interface PageResult<T = any> {
  header: {
    status: number
    requestId?: string
    message: string
  }
  content?: {
    count: number
    rows: T[]
  }
}

// select, include, sort, page, limit, ...where
export interface PageRequestQuery {
  select?: string
  include?: string
  sort?: string
  page?: string
  limit?: string
  [key: string]: any
}
