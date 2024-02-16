import { clearErrorAction, errorAction } from '@admin/ducks/actions/apiError'
import { loginAction } from '@admin/ducks/actions/me'
import { ApiError, ErrorState } from '@admin/ducks/types/apiError'
import { createReducer, PayloadAction } from '@reduxjs/toolkit'


const initialState: ErrorState = {
  error: null
}

const apiError = createReducer(initialState, {
  [errorAction.type]: (state, action: PayloadAction<ApiError>) => {
    return { ...state, error: action.payload.code, message: action.payload.message }
  },
  [clearErrorAction.type]: (state) => {
    return { ...state, error: null, message: undefined }
  },
  [loginAction.SUCCESS]: (state) => {
    return { ...state, error: null, message: undefined }
  },
})

export default apiError
