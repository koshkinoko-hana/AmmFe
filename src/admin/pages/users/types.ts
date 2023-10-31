import { UserLight } from '@admin/ducks/types/user'
import { Option } from '@common/components/select/types'

export interface ListItemProps {
  user?: UserLight
  bold?: boolean
  onClick?: (id: number) => void
  onDelete?: (id: number) => void
}
