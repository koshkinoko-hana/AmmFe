import { Employee } from '@client/ducks/types/employee'

export interface DepartmentLight {
  id: number
  name: string
}

export interface Department extends DepartmentLight {
  name: string
  description?: string
  competencies: string[]
  head: Employee
  employees: DepartmentEmployee[]
  address: string
  phones: string[]
  email: string
}

export interface DepartmentEmployee {
  id: number
  firstName: string
  middleName?: string
  lastName: string
  photoPath?: string
  positions: string[]
}


export interface DepartmentState {
  departments: DepartmentLight[]
  loading: boolean
  current?: Department
}
