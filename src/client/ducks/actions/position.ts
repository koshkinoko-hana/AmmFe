import { createRoutine } from 'redux-saga-routines'

const name = 'position'

export const fetchPositionListAction = createRoutine(`${name}/FETCH_LIST`)
export const fetchPositionOptionsAction = createRoutine(`${name}/FETCH_OPTIONS`)
