import { NewsLight } from '@admin/ducks/types/news'

export interface ListItemProps {
  news?: NewsLight
  bold?: boolean
  onClick?: (slug: string) => void
}
