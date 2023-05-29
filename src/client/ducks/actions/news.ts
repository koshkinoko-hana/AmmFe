import { createRoutine } from 'redux-saga-routines'

const name = 'news_client'

export const fetchNewsListAction = createRoutine(`${name}/FETCH_LIST`)
export const fetchNewsPreviewAction = createRoutine(`${name}/FETCH_OTHERS`)
export const fetchNewsDetailsAction = createRoutine(`${name}/FETCH`)
