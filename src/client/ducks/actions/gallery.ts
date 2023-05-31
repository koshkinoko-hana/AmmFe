import { createRoutine } from 'redux-saga-routines'

const name = 'gallery'

export const fetchGalleryListAction = createRoutine(`${name}/FETCH_LIST`)