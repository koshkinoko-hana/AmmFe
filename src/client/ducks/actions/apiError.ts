import { ApiError } from '@admin/ducks/types/apiError'
import { createAction } from '@reduxjs/toolkit'

const name = 'apiError'


export const errorAction = createAction<ApiError>(`${name}/ERROR`)
export const clearErrorAction = createAction(`${name}/CLEAR_ERROR`)
