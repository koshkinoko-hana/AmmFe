export interface Faq {
    id: number
    firstName: string
    middleName?: string
    lastName: string
    email: string
    question: string
    answer: string
    respondent: string    
  }

export interface FaqState {
    faqs: Faq[]
    current?: Faq
    loading: boolean
  }
