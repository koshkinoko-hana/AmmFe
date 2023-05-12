import { Option } from '@common/components/select/types'

export interface Department {
  id: number
  name: string
  description?: string
  competencies: string[]
}

export interface DepartmentNew {
  name: string
  description?: string
  competencies: string[]
}


export interface DepartmentState {
  departments: Department[]
  departmentOptions: Option[]
  loading: boolean
  current?: Department
}
