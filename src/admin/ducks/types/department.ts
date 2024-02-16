import { EmployeePositionShort, EmployeeShort } from '@admin/ducks/types/employee'
import { Option } from '@common/components/select/types'

export interface DepartmentShort {
  id: number
  name: string
  head: EmployeeShort
  description?: string
}

export interface DepartmentDetailed {
  id: number
  name: string
  head: EmployeeShort
  description?: string
  competencies: string[]
  employees: EmployeePositionShort[]
  address: string
  phones: string[]
  email: string
}

export interface DepartmentRequest {
  id?: number
  name: string
  description?: string
  head: number
  competencies: string[]
  address: string
  phones: string[]
  email: string
}


export interface DepartmentState {
  departments: DepartmentShort[]
  departmentOptions: Option[]
  loading: boolean
  current?: DepartmentDetailed
  error?: boolean
}
