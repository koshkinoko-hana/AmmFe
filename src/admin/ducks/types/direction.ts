export interface DirectionLight {

  id: number
  number: string
  type: string
  name: string
}
export interface Direction extends DirectionLight {
  features: string[]
  profiles: string[]
  forms: string[]
  price: number
  exams: string[]
}
export interface DirectionNew {
  number: string
  type: string
  name: string
  features: string[]
  profiles: string[]
  forms: string[]
  price: number
  exams: string[]
}

export interface DirectionState {
  loading: boolean
  directions: Direction[]
}
