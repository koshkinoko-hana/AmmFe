import { Option } from '@common/components/select/types'

export interface EmployeeLight {
  id: number
  firstName: string
  middleName?: string
  lastName: string
  positions: Option[]
  departments: Option[]
}

export interface Employee extends EmployeeLight {
  photoId?: number
  photoPath?: string
  description?: string
}

export const numHeadEmployee = 1

export interface EmployeeNew {
  firstName: string
  middleName?: string
  lastName: string
  photoId?: number
  photoPath?: string
  description?: string
  positions: number[]
  departments: number[]
}


export interface EmployeeState {
  loading: boolean
  headDepartment?: Employee
  idDepartment?: number
  employees: Employee[]
}

export interface UploadedFileResponse {
  id: number
  path: string
  title?: string
}
