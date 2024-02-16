import { RootState } from '~/common/store'

export const getEmployeesByDepartment = (state: RootState) => state.client.employee.employees
export const getEmployeeLoading = (state: RootState) => state.client.employee.loading
