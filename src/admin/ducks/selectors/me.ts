import { RootState } from '~/common/store'

export const getMeLoggedIn = (state: RootState) => state.admin.me.loggedIn
export const getMeRoles = (state: RootState) => state.admin.me.roles
