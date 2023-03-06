
export interface Department {
  id: number
  name: string
  description?: string
  competencies: string[]
}


export interface DepartmentState {
  departments: Department[]
  loading: boolean
}
