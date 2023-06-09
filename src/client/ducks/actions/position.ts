import { createRoutine } from 'redux-saga-routines'

const name = 'position_client'

export const fetchPositionListAction = createRoutine(`${name}/FETCH_LIST`)
export const fetchPositionOptionsAction = createRoutine(`${name}/FETCH_OPTIONS`)
