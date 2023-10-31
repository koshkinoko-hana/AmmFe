import {
  fetchDepartmentListAction,
  fetchDepartmentAction,
} from '@client/ducks/actions/department'
import { Department, DepartmentState } from '@client/ducks/types/department'
import { createReducer, PayloadAction } from '@reduxjs/toolkit'


const initialState: DepartmentState = {
  departments: [],
  loading: false
}

const department = createReducer(initialState, {
  [fetchDepartmentListAction.TRIGGER]: (state) => {
    return { ...state, loading: true }
  },
  [fetchDepartmentListAction.SUCCESS]: (state, action: PayloadAction<{departments: Department[]}>) => {
    const { departments } = action.payload
    return { ...state, loggedIn: true, loading: false, departments }
  },
  [fetchDepartmentListAction.FAILURE]: (state) => {
    return { ...state, loading: false }
  },
  [fetchDepartmentAction.TRIGGER]: (state) => {
    return { ...state, loading: true }
  },
  [fetchDepartmentAction.SUCCESS]: (state, action: PayloadAction<Department>) => {
    return { ...state, loggedIn: true, loading: false, current: action.payload }
  },
  [fetchDepartmentAction.FAILURE]: (state) => {
    return { ...state, loading: false }
  },
})

export default department
