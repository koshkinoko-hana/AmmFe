import {
  clearEmployeeAction,
  fetchEmployeeAction,
  fetchEmployeeListAction, saveEmployeeAction,
  setEmployeeAction, updateEmployeeAction,
} from '@admin/ducks/actions/employee'
import { Employee, EmployeeState } from '@admin/ducks/types/employee'
import { createReducer, PayloadAction } from '@reduxjs/toolkit'


const initialState: EmployeeState = {
  employees: [],
  loading: false
}

const employee = createReducer(initialState, {
  [fetchEmployeeListAction.TRIGGER]: (state) => {
    return { ...state, loading: true }
  },
  [fetchEmployeeListAction.SUCCESS]: (state, action: PayloadAction<{employees: Employee[]}>) => {
    const { employees } = action.payload
    return { ...state, loggedIn: true, loading: false, employees }
  },
  [fetchEmployeeListAction.FAILURE]: (state) => {
    return { ...state, loading: false }
  },
  [fetchEmployeeAction.TRIGGER]: (state) => {
    return { ...state, loading: true }
  },
  [fetchEmployeeAction.SUCCESS]: (state, action:  PayloadAction<{employee: Employee}>) => {
    return { ...state, current: action.payload.employee, loading: false }
  },
  [fetchEmployeeAction.FAILURE]: (state) => {
    return { ...state, loading: false }
  },
  [saveEmployeeAction.TRIGGER]: (state) => {
    return { ...state, loading: true }
  },
  [updateEmployeeAction.TRIGGER]: (state) => {
    return { ...state, loading: true }
  },
  [saveEmployeeAction.SUCCESS]: (state) => {
    return { ...state, loading: false }
  },
  [updateEmployeeAction.SUCCESS]: (state) => {
    return { ...state, loading: false }
  },
  [saveEmployeeAction.FAILURE]: (state) => {
    return { ...state, loading: false }
  },
  [updateEmployeeAction.FAILURE]: (state) => {
    return { ...state, loading: false }
  },
  [setEmployeeAction.type]: (state, action: PayloadAction<Employee | undefined>) => {
    return { ...state, current: action.payload }
  },
  [setEmployeeAction.type]: (state, action: PayloadAction<Employee | undefined>) => {
    return { ...state, current: action.payload }
  },
  [clearEmployeeAction.type]: (state) => {
    return { ...state, current: undefined }
  },
})

export default employee
