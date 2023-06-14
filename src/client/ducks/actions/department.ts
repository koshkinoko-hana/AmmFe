import { createRoutine } from 'redux-saga-routines'

const name = 'department_client'

export const fetchDepartmentListAction = createRoutine(`${name}/FETCH_LIST`)
export const fetchDepartmentOptionsAction = createRoutine(`${name}/FETCH_OPTIONS`)
export const fetchDepartmentAction = createRoutine(`${name}/FETCH`)
