import { AppState } from '@admin/ducks/types/app'
import { createSlice} from '@reduxjs/toolkit'

export const name = 'app'

const initialState: AppState = {
  menuShown: false
}

const appSlice = createSlice({
  name,
  initialState,
  reducers: {
    toggle(state) {
      state.menuShown = !state.menuShown
    }
  }
})

export const { toggle: toggleMenuAction } = appSlice.actions

export default appSlice.reducer
