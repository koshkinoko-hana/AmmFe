export interface ListItemProps {
  employee?: {
    id: number
    name: string
  }
  bold?: boolean
  onClick?: (id: number) => void
  onDelete?: (id: number) => void
}
