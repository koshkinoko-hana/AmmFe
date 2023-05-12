import {
  clearCurrentPositionAction,
  fetchPositionListAction,
  fetchPositionOptionsAction,
  setCurrentPositionAction,
  updatePositionListAction
} from '@admin/ducks/actions/position'
import { PaginatedResponseWrapper } from '@admin/ducks/types/paginatedResponseWrapper'
import { Position, PositionState } from '@admin/ducks/types/position'
import { Option } from '@common/components/select/types'
import { createReducer, PayloadAction } from '@reduxjs/toolkit'


const initialState: PositionState = {
  positions: [],
  positionOptions: [],
  loading: false
}

const position = createReducer(initialState, {
  [fetchPositionListAction.TRIGGER]: (state) => {
    return { ...state, loading: true }
  },
  [fetchPositionListAction.SUCCESS]: (state, action: PayloadAction<{res: PaginatedResponseWrapper<Position>}>) => {
    const { data } = action.payload.res
    return { ...state, loggedIn: true, loading: false, positions: data }
  },
  [fetchPositionListAction.FAILURE]: (state) => {
    return { ...state, loading: false }
  },
  [fetchPositionOptionsAction.TRIGGER]: (state) => {
    return { ...state, loading: true }
  },
  [fetchPositionOptionsAction.SUCCESS]: (state, action: PayloadAction<{positions: Option[]}>) => {
    const { positions } = action.payload
    return { ...state, loggedIn: true, loading: false, positionOptions: positions }
  },
  [fetchPositionOptionsAction.FAILURE]: (state) => {
    return { ...state, loading: false }
  },
  [setCurrentPositionAction.type]: (state, action: PayloadAction<Position | undefined>) => {
    return { ...state, current: action.payload }
  },
  [clearCurrentPositionAction.type]: (state) => {
    return { ...state, current: undefined }
  },
  [updatePositionListAction.type]: (state, action: PayloadAction<Position>) => {
    const positions = [...state.positions]
    const currentIdx = positions.findIndex(d => d.id === action.payload.id)
    if (currentIdx !== -1) {
      positions[currentIdx] = action.payload
    } else {
      positions.push(action.payload)
    }
    return { ...state, positions }
  },
})

export default position
