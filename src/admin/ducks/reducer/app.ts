import { showDeleteToastAction, showSaveToastAction, showUpdateToastAction } from '@admin/ducks/actions/app'
import { AppState } from '@admin/ducks/types/app'
import { createSlice} from '@reduxjs/toolkit'

export const name = 'app'

const initialState: AppState = {
  menuShown: false,
  showSaveToast: false,
  showUpdateToast: false,
  showDeleteToast: false
}

const appSlice = createSlice({
  name,
  initialState,
  reducers: {
    toggle(state) {
      state.menuShown = !state.menuShown
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(showSaveToastAction, (state) => {
        state.showSaveToast = !state.showSaveToast
      })
      .addCase(showUpdateToastAction, (state) => {
        state.showUpdateToast = !state.showUpdateToast
      })
      .addCase(showDeleteToastAction, (state) => {
        state.showDeleteToast = !state.showDeleteToast
      })
  },
})

export const { toggle: toggleMenuAction } = appSlice.actions

export default appSlice.reducer
