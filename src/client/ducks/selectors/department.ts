import { RootState } from '~/common/store'

export const getDepartments = (state: RootState) => state.client.department.departments
export const getCurrentDepartment = (state: RootState) => state.client.department.current
export const getDepartmentLoading = (state: RootState) => state.client.department.loading
