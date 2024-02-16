export interface ListItemProps {
  photo?: {
    id: number
    title?: string
    path: string
    photoDate?: string
  }
  bold?: boolean
  onClick?: (id: number) => void
}
