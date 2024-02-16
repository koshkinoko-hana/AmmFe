import DepartmentPositionShort from '@common/types/departmentPositionShort'

export interface EmployeeLight {
  id: number
  firstName: string
  middleName?: string
  lastName: string
}

export interface Employee extends EmployeeLight {
  positions: DepartmentPositionShort[]
  photoPath?: string
  description?: string
}

export interface EmployeeState {
  loading: boolean
  employees: Employee[]
}
