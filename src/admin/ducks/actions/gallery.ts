import { createRoutine } from 'redux-saga-routines'

const name = 'gallery'

export const deletePhotoAction = createRoutine(`${name}/DELETE`)
export const createPhotoAction = createRoutine(`${name}/CREATE`)
export const fetchPhotoAction = createRoutine(`${name}/FETCH`)
export const fetchPhotoListAction = createRoutine(`${name}/FETCH_LIST`)
