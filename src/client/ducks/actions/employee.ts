import { createRoutine } from 'redux-saga-routines'

const name = 'employee_client'

export const fetchEmployeeAction = createRoutine(`${name}/FETCH`)
export const fetchEmployeeListAction = createRoutine(`${name}/FETCH_LIST`)
