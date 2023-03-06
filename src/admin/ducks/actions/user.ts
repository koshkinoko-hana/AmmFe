import { createAction } from '@reduxjs/toolkit'
import { createRoutine } from 'redux-saga-routines'

const name = 'user'

export const loginAction = createRoutine(`${name}/LOGIN`)
export const logoutAction = createAction(`${name}/LOGOUT`)
export const fetchMeAction = createRoutine(`${name}/ME/FETCH`)
