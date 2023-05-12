import { Position, PositionNew } from '@admin/ducks/types/position'
import { createAction } from '@reduxjs/toolkit'
import { createRoutine } from 'redux-saga-routines'

const name = 'position'

export const setCurrentPositionAction = createAction<Position>(`${name}/CURRENT`)
export const setLoadingPositionAction = createAction<boolean>(`${name}/CURRENT`)
export const clearCurrentPositionAction = createAction(`${name}/CLEAR_CURRENT`)
export const savePositionAction = createAction<PositionNew>(`${name}/SAVE`)
export const updatePositionAction = createAction<Position>(`${name}/UPDATE`)
export const updatePositionListAction = createAction<Position>(`${name}/UPDATE_LIST`)
export const fetchPositionListAction = createRoutine(`${name}/FETCH_LIST`)
export const fetchPositionOptionsAction = createRoutine(`${name}/FETCH_OPTIONS`)
