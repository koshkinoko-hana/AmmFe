import { RootState } from '@common/store'

export const getOpened = (state: RootState) => state.dialogue.opened
export const getDialogue = (state: RootState) => state.dialogue.dialogue
