export interface PaginatedResponseWrapper<T> {
  readonly data: T[]
  readonly total: number
  readonly offset?: number
  readonly limit?: number
}
