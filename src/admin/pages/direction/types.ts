import { Option } from '@common/components/select/types'

export interface FormData {
  id: number;
  number: string
    type: Option
    name: string
    features: string[]
    profiles: string[]
    forms: string[]
    price: number
    exams: string[]
}
