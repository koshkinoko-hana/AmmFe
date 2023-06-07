import {
  fetchDirectionListAction,
} from '@client/ducks/actions/direction'
import { Direction, DirectionState } from '~/common/types/direction'
import { createReducer, PayloadAction } from '@reduxjs/toolkit'


const initialState: DirectionState = {
  directions: [] as Direction[],
  loading: false
}

const direction = createReducer(initialState, {
  [fetchDirectionListAction.TRIGGER]: (state) => {
    return { ...state, loading: true }
  },
  [fetchDirectionListAction.SUCCESS]: (state, action: PayloadAction<{directions: Direction[]}>) => {
    const { directions } = action.payload
    return { ...state, loggedIn: true, loading: false, directions }
  },
  [fetchDirectionListAction.FAILURE]: (state) => {
    return { ...state, loading: false }
  },
})

export default direction
