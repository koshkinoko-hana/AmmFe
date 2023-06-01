export interface QuestionStrLight {
  firstName: string
  lastName: string
  email: string
  question: string
  createdAt?: string
  updatedAt?: string
}
export interface QuestionStr extends QuestionStrLight {
    middleName?: string
    answer?: string
    respondent?: string
}

export interface QuestionState {
    QuestionList: QuestionStr[]
    loading: boolean
  }
