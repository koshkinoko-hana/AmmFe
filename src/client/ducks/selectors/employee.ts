import { RootState } from '~/common/store'

export const getEmployees = (state: RootState) => state.client.employee.employees
export const getCurrentEmployee = (state: RootState) => state.client.employee.current
export const getEmployeeLoading = (state: RootState) => state.client.employee.loading
