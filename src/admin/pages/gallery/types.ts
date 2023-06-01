export interface ListItemProps {
  photo?: {
    id: number
    title?: string
    path: string
  }
  bold?: boolean
  onClick?: (id: number) => void
}
