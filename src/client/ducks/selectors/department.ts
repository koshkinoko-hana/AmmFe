import { RootState } from '~/common/store'

export const getDepartments = (state: RootState) => state.client.department.departments
export const getDepartmentOptions = (state: RootState) => state.client.department.departmentOptions
export const getCurrentDepartment = (state: RootState) => state.client.department.current
export const getDepartmentLoading = (state: RootState) => state.client.department.loading
