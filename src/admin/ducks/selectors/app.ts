import { RootState } from '~/common/store'

export const getMenuShown = (state: RootState) => state.admin.app.menuShown
export const getShowSaveToast = (state: RootState) => state.admin.app.showSaveToast
export const getShowUpdateToast = (state: RootState) => state.admin.app.showUpdateToast
export const getShowDeleteToast = (state: RootState) => state.admin.app.showDeleteToast
