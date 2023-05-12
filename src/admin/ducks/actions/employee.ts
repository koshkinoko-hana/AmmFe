import { EmployeeLight } from '@admin/ducks/types/employee'
import { createAction } from '@reduxjs/toolkit'
import { createRoutine } from 'redux-saga-routines'

const name = 'employee'

export const setEmployeeAction = createAction<EmployeeLight>(`${name}/CURRENT`)
export const clearEmployeeAction = createAction(`${name}/CLEAR_CURRENT`)
export const saveEmployeeAction = createRoutine(`${name}/SAVE`)
export const updateEmployeeAction = createRoutine(`${name}/UPDATE`)
export const fetchEmployeeAction = createRoutine(`${name}/FETCH`)
export const fetchEmployeeListAction = createRoutine(`${name}/FETCH_LIST`)
