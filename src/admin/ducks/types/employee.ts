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
  current?: Employee
  employees: Employee[]
  options: Option[]
}

export interface UploadedFileResponse {
  id: number
  path: string
  title?: string
}

export interface EmployeeShort {
  id: number
  name: string
}

export interface EmployeePositionShort {
  id: number
  name: string
  positionId: number
  positionName: string
}
