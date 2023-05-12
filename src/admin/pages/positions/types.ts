import { Position } from '@admin/ducks/types/position'

export interface ListItemProps {
  position?: {
    id: number
    name: string
  }
  bold?: boolean
  onClick?: (p: Position) => void
}
