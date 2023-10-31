export interface ListItemProps {
  album?: {
    id: number
    title?: string
    date?: string
  }
  bold?: boolean
  onClick?: (id: number) => void
}
