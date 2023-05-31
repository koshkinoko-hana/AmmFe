import {
  fetchDepartmentListAction,
  fetchDepartmentOptionsAction,
} from '@client/ducks/actions/department'
import { Department, DepartmentState } from '@client/ducks/types/department'
import { Option } from '@common/components/select/types'
import { createReducer, PayloadAction } from '@reduxjs/toolkit'


const initialState: DepartmentState = {
  departments: [],
  departmentOptions: [],
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
  [fetchDepartmentOptionsAction.TRIGGER]: (state) => {
    return { ...state, loading: true }
  },
  [fetchDepartmentOptionsAction.SUCCESS]: (state, action: PayloadAction<{departments: Option[]}>) => {
    const { departments } = action.payload
    return { ...state, loggedIn: true, loading: false, departmentOptions: departments }
  },
  [fetchDepartmentOptionsAction.FAILURE]: (state) => {
    return { ...state, loading: false }
  },
})

export default department
