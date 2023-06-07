import {
  fetchPositionListAction,
  fetchPositionOptionsAction,
} from '@client/ducks/actions/position'
import { PaginatedResponseWrapper } from '@client/ducks/types/paginatedResponseWrapper'
import { Position, PositionState } from '@client/ducks/types/position'
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
})

export default position
