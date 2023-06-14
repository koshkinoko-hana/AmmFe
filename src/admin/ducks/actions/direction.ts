import { createRoutine } from 'redux-saga-routines'

const name = 'direction'

export const createDirectionAction = createRoutine(`${name}/CREATE`)
export const updateDirectionAction = createRoutine(`${name}/UPDATE`)
export const fetchDirectionListAction = createRoutine(`${name}/FETCH_LIST`)
