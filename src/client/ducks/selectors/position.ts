import { RootState } from '~/common/store'

export const getPositions = (state: RootState) => state.client.position.positions
export const getPositionOptions = (state: RootState) => state.client.position.positionOptions
export const getCurrentPosition = (state: RootState) => state.client.position.current
export const getPositionLoading = (state: RootState) => state.client.position.loading
