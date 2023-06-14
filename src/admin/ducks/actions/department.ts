import { Department, DepartmentNew } from '@admin/ducks/types/department'
import { createAction } from '@reduxjs/toolkit'
import { createRoutine } from 'redux-saga-routines'

const name = 'department_admin'

export const setCurrentDepartmentAction = createAction<Department>(`${name}/CURRENT`)
export const clearCurrentDepartmentAction = createAction(`${name}/CLEAR_CURRENT`)
export const saveDepartmentAction = createAction<DepartmentNew>(`${name}/SAVE`)
export const updateDepartmentAction = createAction<Department>(`${name}/UPDATE`)
export const uploadPhoto = createRoutine(`${name}/UPLOAD_PHOTO`)
export const updateDepartmentListAction = createAction<Department>(`${name}/UPDATE_LIST`)
export const fetchDepartmentListAction = createRoutine(`${name}/FETCH_LIST`)
export const fetchDepartmentOptionsAction = createRoutine(`${name}/FETCH_OPTIONS`)
export const fetchDepartmentAction = createRoutine(`${name}/FETCH`)
