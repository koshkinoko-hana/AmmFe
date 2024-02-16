import { DepartmentDetailed } from '@admin/ducks/types/department'
import { RootState } from '~/common/store'

export const getDepartments = (state: RootState) => state.admin.department.departments
export const getDepartmentOptions = (state: RootState) => state.admin.department.departmentOptions
export const getCurrentDepartment = (state: RootState) => state.admin.department.current
export const getDepartmentLoading = (state: RootState) => state.admin.department.loading
