import { Option } from '@common/components/select/types'

export interface ListItemProps {
  employee?: {
    id: number
    name: string
    positions?: Option[]
    departments?: Option[]
  }
  bold?: boolean
  onClick?: (id: number) => void
}
