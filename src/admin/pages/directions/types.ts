import { Direction } from '~/common/types/direction'

export interface ListItemProps {
  direction?: Direction
  bold?: boolean
  onClick?: (id: number) => void
}
