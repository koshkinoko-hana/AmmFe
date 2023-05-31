import { Option } from '@common/components/select/types'

export interface ListItemProps {
  faq?: {
    id: number
    name: string
    question: string
    answer: string
    respondent: string
  }
  bold?: boolean
  onClick?: (id: number) => void
}
