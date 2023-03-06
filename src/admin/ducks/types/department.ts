
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
  loading: boolean
  current?: Department
}
