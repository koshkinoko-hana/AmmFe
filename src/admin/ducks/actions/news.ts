import { createAction } from '@reduxjs/toolkit'
import { createRoutine } from 'redux-saga-routines'

const name = 'news'

export const clearNewsAction = createAction(`${name}/CLEAR_CURRENT`)
export const saveNewsAction = createRoutine(`${name}/SAVE`)
export const updateNewsAction = createRoutine(`${name}/UPDATE`)
export const fetchNewsAction = createRoutine(`${name}/FETCH`)
export const fetchNewsListAction = createRoutine(`${name}/FETCH_LIST`)
export const fetchNewsPreviewAction = createRoutine(`${name}/FETCH_OTHERS`)
export const fetchNewsDetailsAction = createRoutine(`${name}/FETCH`)
