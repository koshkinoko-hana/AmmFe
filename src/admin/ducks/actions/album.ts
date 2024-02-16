import { createRoutine } from 'redux-saga-routines'

const name = 'album'

export const deleteAlbumAction = createRoutine(`admin/${name}/DELETE`)
export const createAlbumAction = createRoutine(`admin/${name}/CREATE`)
export const updateAlbumAction = createRoutine(`admin/${name}/UPDATE`)
export const fetchAlbumAction = createRoutine(`admin/${name}/FETCH`)
export const fetchAlbumListAction = createRoutine(`admin/${name}/FETCH_LIST`)
