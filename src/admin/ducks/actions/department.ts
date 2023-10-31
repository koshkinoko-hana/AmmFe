import { createRoutine } from 'redux-saga-routines'

const name = 'department_admin'

export const saveDepartmentAction = createRoutine(`${name}/SAVE`)
export const updateDepartmentAction = createRoutine(`${name}/UPDATE`)
export const updateDepartmentEmployeesAction = createRoutine(`${name}/UPDATE_EMPLOYEES`)
export const uploadPhoto = createRoutine(`${name}/UPLOAD_PHOTO`)
export const fetchDepartmentListAction = createRoutine(`${name}/FETCH_LIST`)
export const fetchDepartmentOptionsAction = createRoutine(`${name}/FETCH_OPTIONS`)
export const fetchDepartmentAction = createRoutine(`${name}/FETCH`)
