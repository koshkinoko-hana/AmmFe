import { clearErrorAction, errorAction } from '@admin/ducks/actions/apiError'
import { ApiError, ErrorState } from '@admin/ducks/types/apiError'
import { createReducer, PayloadAction } from '@reduxjs/toolkit'


const initialState: ErrorState = {
  error: null
}

const apiError = createReducer(initialState, {
  [errorAction.type]: (state, action: PayloadAction<ApiError>) => {
    return { ...state, error: action.payload }
  },
  [clearErrorAction.type]: (state) => {
    return { ...state, error: null }
  },
})

export default apiError
