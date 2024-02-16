import { RootState } from '~/common/store'

export const getEmployees = (state: RootState) => state.admin.employee.employees
export const getEmployeeOptions = (state: RootState) => state.admin.employee.options
export const getCurrentEmployee = (state: RootState) => state.admin.employee.current
export const getEmployeeLoading = (state: RootState) => state.admin.employee.loading
