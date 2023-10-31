import { RootState } from '~/common/store'

export const getUsers = (state: RootState) => state.admin.user.users
export const getCurrentUser = (state: RootState) => state.admin.user.current
export const getUserLoading = (state: RootState) => state.admin.user.loading
