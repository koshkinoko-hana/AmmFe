import { RootState } from '~/common/store'

export const getEmployeesByDepartment = (state: RootState) => state.client.employee.employees
export const getHeadEmployee = (state: RootState) => state.client.employee.headDepartment
export const getEmployeeLoading = (state: RootState) => state.client.employee.loading
