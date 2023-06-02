import { RootState } from '~/common/store'

export const getUserLoggedIn = (state: RootState) => state.admin.user.loggedIn
export const getUserRoles = (state: RootState) => state.admin.user.roles
