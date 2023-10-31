import { ApiError, ErrorCode } from '@admin/ducks/types/apiError'
import { RootState } from '~/common/store'

export const getError: (state: RootState) => ErrorCode | null = (state) => state.apiError.error
export const getErrorMessage: (state: RootState) => string | undefined = (state) => state.apiError.message
