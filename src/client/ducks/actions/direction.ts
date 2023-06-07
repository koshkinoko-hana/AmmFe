import { createRoutine } from 'redux-saga-routines'

const name = 'direction'

export const fetchDirectionListAction = createRoutine(`${name}/FETCH_LIST_CLIENT`)
