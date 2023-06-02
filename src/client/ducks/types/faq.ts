export interface QuestionStr  {
  id?: number
  firstName: string
  middleName?: string
  lastName: string
  email: string
  question: string
  answer?: string
  respondent?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface QuestionState {
    QuestionList: QuestionStr[]
    loading: boolean
  }

