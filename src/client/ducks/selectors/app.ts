import { RootState } from '~/common/store'

export const getMenuShown = (state: RootState) => state.admin.app.menuShown
