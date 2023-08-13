import {
  fetchDepartmentAction,
  fetchDepartmentListAction,
  fetchDepartmentOptionsAction, saveDepartmentAction, updateDepartmentAction,
} from '@admin/ducks/actions/department'
import { DepartmentDetailed, DepartmentShort, DepartmentState } from '@admin/ducks/types/department'
import { Option } from '@common/components/select/types'
import { Action, createReducer, PayloadAction } from '@reduxjs/toolkit'


const initialState: DepartmentState = {
  departments: [],
  departmentOptions: [],
  loading: false
}

const department = createReducer(initialState, {
  [fetchDepartmentListAction.TRIGGER]: (state) => {
    return { ...state, loading: true }
  },
  [fetchDepartmentListAction.SUCCESS]: (state, action: PayloadAction<{departments: DepartmentShort[]}>) => {
    const { departments } = action.payload
    return { ...state, loggedIn: true, loading: false, departments }
  },
  [fetchDepartmentListAction.FAILURE]: (state) => {
    return { ...state, loading: false }
  },
  [fetchDepartmentAction.TRIGGER]: (state) => {
    return { ...state, loading: true }
  },
  [fetchDepartmentAction.SUCCESS]: (state, action: PayloadAction<{department: DepartmentDetailed}>) => {
    const { department } = action.payload
    return { ...state, loggedIn: true, loading: false, current: department }
  },
  [fetchDepartmentAction.FAILURE]: (state) => {
    return { ...state, loading: false }
  },
  [fetchDepartmentOptionsAction.TRIGGER]: (state) => {
    return { ...state, loading: true }
  },
  [fetchDepartmentOptionsAction.SUCCESS]: (state, action: PayloadAction<{departments: Option[]}>) => {
    const { departments } = action.payload
    return { ...state, loading: false, departmentOptions: departments }
  },
  [fetchDepartmentOptionsAction.FAILURE]: (state) => {
    return { ...state, loading: false }
  },
  [updateDepartmentAction.TRIGGER]: (state) => {
    return { ...state, loading: true }
  },
  [updateDepartmentAction.SUCCESS]: (state) => {
    return { ...state,  loading: false, error: false }
  },
  [updateDepartmentAction.FAILURE]: (state) => {
    return { ...state, loading: false, error: true }
  },
  [saveDepartmentAction.TRIGGER]: (state) => {
    return { ...state, loading: true }
  },
  [saveDepartmentAction.SUCCESS]: (state) => {
    return { ...state,  loading: false, error: false }
  },
  [saveDepartmentAction.FAILURE]: (state) => {
    return { ...state, loading: false, error: true }
  },
})

export default department
