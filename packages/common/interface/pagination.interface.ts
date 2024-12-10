export interface IPaginatedRequest {
  page: number
  pageSize: number
}

export interface IPaginatedResponse<TData = any> extends IPaginatedRequest {
  total: number
  count: number
  data: TData[]
}

