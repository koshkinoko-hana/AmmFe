export interface QuestionStrLight  {
  id?: number
  answer?: string
  respondent?: string
  updatedAt?: Date
}

export interface QuestionStr extends  QuestionStrLight {
  firstName: string
  middleName?: string
  lastName: string
  email: string
  question: string
  createdAt?: Date
}

export interface QuestionState {
    QuestionList: QuestionStr[]
    loading: boolean
  }

