export type ErrorState = {
  error: ErrorCode | null
  message?: string
}

export interface ApiError {
  code: ErrorCode,
  message?: string
}

export enum ErrorCode {
  BAD_REQUEST=400,
  CONFLICT=409,
  UNAUTHORIZED=401,
  FORBIDDEN=403,
  NOT_FOUND=404,
  BACKEND_ERROR=500
}
