import { createRoutine } from 'redux-saga-routines'

const name = 'user_admin'

export const saveUserAction = createRoutine(`${name}/SAVE`)
export const updateUserAction = createRoutine(`${name}/UPDATE`)
export const fetchUserListAction = createRoutine(`${name}/FETCH_LIST`)
export const fetchUserAction = createRoutine(`${name}/FETCH`)
