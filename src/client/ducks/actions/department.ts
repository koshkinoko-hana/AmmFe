import { createRoutine } from 'redux-saga-routines'

const name = 'department_client'

export const fetchDepartmentListAction = createRoutine(`${name}/FETCH_LIST`)
export const fetchDepartmentAction = createRoutine(`${name}/FETCH`)
