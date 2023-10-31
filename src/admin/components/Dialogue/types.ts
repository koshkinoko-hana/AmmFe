export interface DialogueProps {
  message: string
  messageBtn?: string
  showCancel?: boolean
  onClick: () => void
  onCancelClick?: () => void
  header: string
}
