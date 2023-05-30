import { RootState } from '~/common/store'

export const getPositions = (state: RootState) => state.admin.position.positions
export const getPositionOptions = (state: RootState) => state.admin.position.positionOptions
export const getCurrentPosition = (state: RootState) => state.admin.position.current
export const getPositionLoading = (state: RootState) => state.admin.position.loading
