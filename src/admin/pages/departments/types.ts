import { Department } from '@common/components/types/department'

export interface ListItemProps {
  department: {
    id: string | number
    name: string
    description?: string
  }
  bold?: boolean
  onClick?: (d: Department) => void
}
