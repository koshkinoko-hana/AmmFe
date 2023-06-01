export interface QuestionStr {
    firstName: string
    middleName?: string
    lastName: string
    email: string,
    question: string,
    answer: string,
    respondent: string
  }

export interface QuestionState {
    QuestionList: QuestionStr[]
    loading: boolean
  }
