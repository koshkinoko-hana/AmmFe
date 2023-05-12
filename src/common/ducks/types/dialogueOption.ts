export enum DialogueOption {
  ADMIN_DEPARTMENT = 'admin/DEPARTMENT',
  ADMIN_POSITION = 'admin/POSITION',

}

export interface DialogueState {
  opened: boolean
  loading: boolean
  dialogue?: DialogueOption
}
