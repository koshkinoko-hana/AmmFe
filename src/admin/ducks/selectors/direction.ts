import { RootState } from '~/common/store'

export const getDirections = (state: RootState) => state.admin.direction.directions
export const getDirectionLoading = (state: RootState) => state.admin.direction.loading
