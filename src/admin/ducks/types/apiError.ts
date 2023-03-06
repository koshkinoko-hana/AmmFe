export type ErrorState = {
  error: ApiError | null
}

export enum ApiError {
  UNAUTHORIZED=401,
  FORBIDDEN=403,
  NOT_FOUND=404,
}
