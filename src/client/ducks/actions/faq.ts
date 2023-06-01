import { createRoutine } from 'redux-saga-routines'

const name = 'faq'

export const fetchQuestionAction = createRoutine(`${name}/FETCH`)
export const fetchQuestionListAction = createRoutine(`${name}/FETCH_LIST`)
export const saveQuestionAction = createRoutine(`${name}/SAVE`)
