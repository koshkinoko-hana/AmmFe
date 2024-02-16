import { createRoutine } from 'redux-saga-routines'

const name = 'gallery'

export const deletePhotoAction = createRoutine(`admin/${name}/DELETE`)
export const createPhotoAction = createRoutine(`admin/${name}/CREATE`)
export const uploadPhotoAction = createRoutine(`admin/${name}/UPLOAD`)
export const fetchPhotoAction = createRoutine(`admin/${name}/FETCH`)
export const fetchPhotoListAction = createRoutine(`admin/${name}/FETCH_LIST`)
