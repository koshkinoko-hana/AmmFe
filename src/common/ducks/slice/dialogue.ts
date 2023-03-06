import { DialogueOption, DialogueState } from '@common/ducks/types/dialogueOption'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const name = 'dialogue'

const initialState: DialogueState = {
  opened: false,
  loading: false
}

const dialogueSlice = createSlice({
  name,
  initialState,
  reducers: {
    open(state, action: PayloadAction<DialogueOption>) {
      state.opened = true
      state.dialogue = action.payload
    },
    close(state) {
      state.opened = false
      state.loading = false
      state.dialogue = undefined
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    }
  }
})

export const { open: openDialogueAction, close: closeDialogueAction, setLoading: setLoadingDialogueAction } = dialogueSlice.actions

export default dialogueSlice.reducer
