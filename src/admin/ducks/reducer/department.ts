import {
  clearCurrentDepartmentAction,
  fetchDepartmentListAction,
  fetchDepartmentOptionsAction,
  setCurrentDepartmentAction,
  updateDepartmentListAction
} from '@admin/ducks/actions/department'
import { Department, DepartmentState } from '@admin/ducks/types/department'
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
  [setCurrentDepartmentAction.type]: (state, action: PayloadAction<Department | undefined>) => {
    return { ...state, current: action.payload }
  },
  [clearCurrentDepartmentAction.type]: (state) => {
    return { ...state, current: undefined }
  },
  [updateDepartmentListAction.type]: (state, action: PayloadAction<Department>) => {
    const departments = [...state.departments]
    const currentIdx = departments.findIndex(d => d.id === action.payload.id)
    if (currentIdx !== -1) {
      departments[currentIdx] = action.payload
    } else {
      departments.push(action.payload)
    }
    return { ...state, departments }
  },
})

export default department
