import { ApiError } from '@admin/ducks/types/apiError'
import { RootState } from '~/common/store'

export const getError: (state: RootState) => ApiError | null = (state) => state.apiError.error
