export enum DialogueOption {
  ADMIN_DEPARTMENT = 'admin/DEPARTMENT'
}

export interface DialogueState {
  opened: boolean
  loading: boolean
  dialogue?: DialogueOption
}
