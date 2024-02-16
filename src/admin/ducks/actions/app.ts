import { createAction } from '@reduxjs/toolkit'


const name = 'app_admin'


export const showSaveToastAction = createAction(`${name}/SHOW_SAVE_TOAST`)
export const showUpdateToastAction = createAction(`${name}/SHOW_UPDATE_TOAST`)
export const showDeleteToastAction = createAction(`${name}/SHOW_DELETE_TOAST`)
