import { createRoutine } from 'redux-saga-routines'

const name = 'faq'

export const fetchFaqListAction = createRoutine(`${name}/FETCH_LIST`)
export const fetchCurrentQuestionAction = createRoutine(`${name}/FETCH`)
export const saveCurrentQuestionAction = createRoutine(`${name}/SAVE`)
export const updateCurrentQuestionAction = createRoutine(`${name}/UPDATE`)
